import json, os, re, sys
import pymupdf as fitz
from collections import Counter

QD="/tmp/qdata.json"; TSV="/tmp/dp600.tsv"
OUT="public/assets/dp600/questions"; IDX="public/question-index.json"; QTS="src/data/questions.ts"
BASE="/dp600/"

def norm(s): return re.sub(r"\s+"," ",str(s)).strip()

# ---- load TSV: page -> words (y,x,text) ----
PAGES={}
for line in open(TSV,encoding='utf8',errors='replace'):
    parts=line.rstrip("\n").split("\t")
    if len(parts)!=6: continue
    try: pg=int(parts[0]); x=float(parts[1]); y=float(parts[2])
    except ValueError: continue
    t=parts[5]
    if not t.strip(): continue
    PAGES.setdefault(pg,[]).append((y,x,norm(t)))

def page_text(pg):
    ws=PAGES.get(pg,[])
    ws.sort(key=lambda w:(w[0],w[1]))
    txt=" ".join(w[2] for w in ws)
    return txt

def stem_y(pg, stem):
    if not stem: return None
    needle=norm(stem)
    ws=sorted(PAGES.get(pg,[]),key=lambda w:(w[0],w[1]))
    txt=" ".join(w[2] for w in ws)
    i=txt.find(needle)
    if i>=0:
        acc=0
        for w in ws:
            acc+=len(w[2])+1
            if acc>i: return w[0]
        return ws[0][0]
    i2=txt.find(needle[:12])
    if i2>=0:
        acc=0
        for w in ws:
            acc+=len(w[2])+1
            if acc>i2: return w[0]
        return ws[0][0]
    return None

Q=json.load(open(QD))
def qtext(q): return q.get("q") or (q.get("hotset") or [{}])[0].get("s") or ""
def qtype(q):
    if isinstance(q.get("hotset"),list) and len(q["hotset"]):
        ans=[str(x.get("yn",x.get("y",x.get("a","")))) for x in q["hotset"] if isinstance(x,dict)]
        if ans and all(a[:1].upper() in ("T","F") for a in ans if a): return "trueFalse"
        return "yesNo"
    if isinstance(q.get("blanks"),list) and len(q["blanks"]): return "dragDrop"
    return "multiple" if len(q.get("a") or [])>1 else "single"

# verify first-page stems; build corrected pgs
MISSING=[]; CORR={}
for q in Q:
    n=q["n"]; pgs=[int(x) for x in (q.get("pgs") or [])]
    if not pgs: MISSING.append((n,0,'no pgs')); CORR[n]=[]; continue
    y=stem_y(pgs[0], qtext(q))
    if y is None:
        # try all pages
        found=[p for p in PAGES if stem_y(p,qtext(q)) is not None]
        MISSING.append((n,pgs[0],'stem not on first page; found on '+str(found[:4])))
        if found:
            CORR[n]=[found[0]]+pgs[1:] if found[0]!=pgs[0] else pgs
        else:
            CORR[n]=pgs
    else:
        CORR[n]=pgs

# first-page starts per page (for boundaries)
def first_y(n):
    pgs=CORR[n]; 
    return stem_y(pgs[0], qtext(Q[n-1])) if pgs else None
starts_per={}
for q in Q:
    n=q["n"]; pgs=CORR.get(n,[])
    if not pgs: continue
    y=stem_y(pgs[0], qtext(q))
    starts_per.setdefault(pgs[0],[]).append((y if y is not None else -1,n))
for p in starts_per: starts_per[p].sort()

doc=fitz.open("/home/user/uploaded_files/dp-600.pdf")
def crop(q):
    n=q["n"]; pgs=CORR.get(n,[]) or q.get("pgs") or []
    if not pgs: return []
    urls=[]; last=len(pgs)-1; H_prev=None
    for i,p in enumerate(pgs):
        page=doc[p-1]; H=page.rect.height; W=page.rect.width
        if i==0:
            y=stem_y(p, qtext(q))
            y0=max(0.0,(y-14) if y is not None else 0.0)
        else:
            y0=0.0
        if i==last:
            nxt=[yy for yy,nn in starts_per.get(p,[]) if nn>n]
            y1=(max(y0+80,min(nxt)-12) if nxt else H-8)
        else:
            y1=H-6
        y1=min(y1,H); 
        if y1<y0+60: y1=min(H,y0+60)
        clip=fitz.Rect(0,min(y0,H-60),W,max(y1,y0+60))
        pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=clip)
        fname=f"q{n:03d}-page-{p:02d}.png"
        path=os.path.join(OUT,fname); os.makedirs(os.path.dirname(path),exist_ok=True)
        pix.save(path); urls.append(f"{BASE}assets/dp600/questions/{fname}")
    return urls

os.makedirs(OUT,exist_ok=True); CROP={}; INDEX=[]
for q in Q:
    n=q["n"]; urls=crop(q); CROP[n]=urls
    INDEX.append({"id":f"q{n:03d}","number":n,"sourcePages":CORR.get(n,[]) or q.get("pgs") or [],"type":qtype(q),"imageFiles":urls})
json.dump(INDEX,open(IDX,"w"),ensure_ascii=False,indent=2)

# ---- regenerate questions.ts ----
def normYN(v):
    s=str(v or "").lower()
    if s.startswith("y") or s.startswith("t"): return "Yes" if s.startswith("y") else "True"
    if s.startswith("n") or s.startswith("f"): return "No" if s.startswith("n") else "False"
    return str(v or "")
rows=[]
for q in Q:
    n=q["n"]; pgs=CORR.get(n,[]) or [int(x) for x in (q.get("pgs") or [])]
    base={"id":f"q{n:03d}","number":n,"sourcePages":pgs,"images":CROP[n],
        "fullImages":[f"{BASE}pages/p-{p:03d}.png" for p in pgs],
        "category":q.get("d") or "","question":qtext(q) or "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
        "explanation":q.get("w") or "","reference":q.get("r") or ""}
    typ=qtype(q)
    if typ in ("yesNo","trueFalse"):
        base["type"]=typ; base["statements"]=[]
        for i,x in enumerate(q.get("hotset") or []):
            d=x if isinstance(x,dict) else {"t":str(x)}
            base["statements"].append({"id":f"s{i}","text":d.get("t") or d.get("text") or d.get("s") or "","correctAnswer":normYN(d.get("yn",d.get("y",d.get("a",d.get("v","")))))})
    elif typ=="dragDrop":
        base["type"]="dragDrop"; blanks=q.get("blanks") or []
        items=[]; seen=set()
        for b in blanks:
            opts=(b.get("opts") or b.get("options") or []) if isinstance(b,dict) else []
            for o in opts:
                ot=o if isinstance(o,str) else o.get("text",o.get("t",""))
                if ot and ot not in seen: seen.add(ot); items.append({"id":f"d{len(items)}","text":ot})
        idOf={it["text"]:it["id"] for it in items}
        zones=[]; dc={}
        for i,b in enumerate(blanks):
            lbl=(b.get("lb") or b.get("label") or f"الفراغ {i+1}") if isinstance(b,dict) else f"الفراغ {i+1}"
            zones.append({"id":f"z{i}","label":lbl})
            if isinstance(b,dict) and isinstance(b.get("a"),int):
                opts=(b.get("opts") or b.get("options") or [])
                if b["a"]<len(opts):
                    want=opts[b["a"]]
                    want=want if isinstance(want,str) else want.get("text",want.get("t",""))
                    if str(want) in idOf: dc[f"z{i}"]=idOf[str(want)]
        base["dragItems"]=items; base["dropZones"]=zones; base["dragCorrect"]=dc
    else:
        base["type"]=typ; opts=q.get("o") or []
        base["options"]=[{"id":f"o{chr(65+i)}","text":o if isinstance(o,str) else o.get("text",o.get("t",""))} for i,o in enumerate(opts)]
        base["correctAnswers"]=[f"o{chr(65+int(x))}" for x in (q.get("a") or [])]
    rows.append(base)
open(QTS,"w").write("// Generated by scripts/do_crop2.py — do not edit by hand.\nimport type { QuizQuestion } from \"@/types/quiz\";\n\nexport const QUESTIONS: QuizQuestion[] = "+json.dumps(rows,ensure_ascii=False,indent=1)+";\n")

types=Counter(r["type"] for r in rows)
multi=[r["number"] for r in rows if len(r["sourcePages"])>1]
print("QUESTIONS:",len(rows),"| PAGES: 121")
print("TYPES:",dict(types))
print("MULTI_PAGE_COUNT:",len(multi),"| LIST:",multi)
print("IMAGES:",sum(len(r["images"]) for r in rows))
print("STEM_PROBLEMS:",MISSING if MISSING else "NONE")

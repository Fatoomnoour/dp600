import json, os, re, sys
import xml.etree.ElementTree as ET
import pymupdf as fitz

QD="/tmp/qdata.json"; XML="/tmp/dp600-bbox.xml"
OUT="public/assets/dp600/questions"; IDX="public/question-index.json"; QTS="src/data/questions.ts"
BASE="/dp600/"

def norm(s): return re.sub(r"\s+"," ",str(s)).strip()

doc=fitz.open("/home/user/uploaded_files/dp-600.pdf")
root=ET.parse(XML).getroot()
pages=[p for p in root.findall('page')]
def page_words(pageno):
    p=pages[pageno-1]
    ws=[]
    for w in p.findall('word'):
        x0,y0,x1,y1=float(w.get('xMin')),float(w.get('yMin')),float(w.get('xMax')),float(w.get('yMax'))
        ws.append((x0,y0,x1,y1,w.text or ""))
    ws.sort(key=lambda w:(w[1],w[0]))
    return ws

# per page: concatenated normalized text with word->start char mapping
PAGEINFO={}
for pageno in range(1,len(pages)+1):
    ws=page_words(pageno)
    parts=[]; starts=[]
    acc=""
    for w in ws:
        txt=norm(w[4])
        if not txt: continue
        starts.append((len(acc),w[1])); acc+=txt+" "
    PAGEINFO[pageno]={"text":acc,"starts":starts}

def stem_y(pageno, stem):
    if not stem: return None
    needle=norm(stem)
    text=PAGEINFO[pageno]["text"]; starts=PAGEINFO[pageno]["starts"]
    i=text.find(needle)
    if i>=0:
        st=sorted(starts, key=lambda s:abs(s[0]-i))
        return st[0][1]
    # fuzzy: first 12 chars
    i2=text.find(needle[:12])
    if i2>=0:
        st=sorted(starts, key=lambda s:abs(s[0]-i2))
        return st[0][1]
    return None

Q=json.load(open(QD))
def qtext(q):
    return q.get("q") or (q.get("hotset") or [{}])[0].get("s") or ""
def qtype(q):
    if isinstance(q.get("hotset"),list) and len(q["hotset"]):
        ans=[str(x.get("yn",x.get("y",x.get("a","")))) for x in q["hotset"] if isinstance(x,dict)]
        if ans and all(a[:1].upper() in ("T","F") for a in ans if a): return "trueFalse"
        return "yesNo"
    if isinstance(q.get("blanks"),list) and len(q["blanks"]): return "dragDrop"
    return "multiple" if len(q.get("a") or [])>1 else "single"

# first-page starts for boundary detection
starts_per={}
for q in Q:
    pgs=q.get("pgs") or []; n=q["n"]
    if not pgs: continue
    y=stem_y(pgs[0], qtext(q))
    starts_per.setdefault(pgs[0],[]).append((y if y is not None else -1,n))
for p in starts_per: starts_per[p].sort()

MISSING=[]
def crop(q):
    n=q["n"]; pgs=q.get("pgs") or []
    if not pgs: return []
    urls=[]; last=len(pgs)-1
    for i,p in enumerate(pgs):
        page=doc[p-1]; H=page.rect.height; W=page.rect.width
        if i==0:
            y=stem_y(p, qtext(q))
            if y is None:
                MISSING.append((n,p,qtext(q)[:30]))
                y0=0.0
            else:
                y0=max(0.0,y-14)
        else:
            y0=0.0
        if i==last:
            nxt=[yy for yy,nn in starts_per.get(p,[]) if nn>n]
            y1=(max(y0+80,min(nxt)-12) if nxt else H-8)
        else:
            y1=H-6
        y1=min(y1,H); y0=min(y0,max(0,H-60))
        clip=fitz.Rect(0,y0,W,y1)
        pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=clip)
        fname=f"q{n:03d}-page-{p:02d}.png"
        path=os.path.join(OUT,fname); os.makedirs(os.path.dirname(path),exist_ok=True)
        pix.save(path)
        urls.append(f"{BASE}assets/dp600/questions/{fname}")
    return urls

os.makedirs(OUT,exist_ok=True)
CROP={}
INDEX=[]
for q in Q:
    urls=crop(q); CROP[q["n"]]=urls
    INDEX.append({"id":f"q{q['n']:03d}","number":q["n"],
        "sourcePages":[int(x) for x in (q.get("pgs") or [])],"type":qtype(q),"imageFiles":urls})
json.dump(INDEX,open(IDX,"w"),ensure_ascii=False,indent=2)

# ---- regenerate questions.ts (same schema + sourcePages + fullImages) ----
def normYN(v):
    s=str(v or "").lower()
    if s.startswith("y") or s.startswith("t"): return "Yes" if s.startswith("y") else "True"
    if s.startswith("n") or s.startswith("f"): return "No" if s.startswith("n") else "False"
    return str(v or "")
rows=[]
for q in Q:
    n=q["n"]; pgs=[int(x) for x in (q.get("pgs") or [])]
    base={"id":f"q{n:03d}","number":n,"sourcePages":pgs,
        "images":CROP[n],
        "fullImages":[f"{BASE}pages/p-{p:03d}.png" for p in pgs],
        "category":q.get("d") or "",
        "question":qtext(q) or "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
        "explanation":q.get("w") or "", "reference":q.get("r") or ""}
    typ=qtype(q)
    if typ in ("yesNo","trueFalse"):
        base["type"]=typ
        base["statements"]=[]
        for i,x in enumerate(q.get("hotset") or []):
            d=x if isinstance(x,dict) else {"t":str(x)}
            base["statements"].append({"id":f"s{i}",
                "text":d.get("t") or d.get("text") or d.get("s") or "",
                "correctAnswer":normYN(d.get("yn",d.get("y",d.get("a"))))})
    elif typ=="dragDrop":
        base["type"]="dragDrop"
        blanks=q.get("blanks") or []
        items=[]; seen=set()
        for b in blanks:
            opts=b.get("opts") or b.get("options") or [] if isinstance(b,dict) else []
            for o in opts:
                ot=o if isinstance(o,str) else o.get("text",o.get("t",""))
                if ot and ot not in seen: seen.add(ot); items.append({"id":f"d{len(items)}","text":ot})
        idOf={t:it["id"] for it in items for t in [it["text"]]}
        zones=[]; dc={}
        for i,b in enumerate(blanks):
            lbl=(b.get("lb") or b.get("label") or f"الفراغ {i+1}") if isinstance(b,dict) else f"الفراغ {i+1}"
            zones.append({"id":f"z{i}","label":lbl})
            if isinstance(b,dict) and isinstance(b.get("a"),int):
                opts=b.get("opts") or b.get("options") or []
                if b["a"]<len(opts):
                    want=opts[b["a"]]
                    want=want if isinstance(want,str) else want.get("text",want.get("t",""))
                    dc[f"z{i}"]=idOf.get(str(want),"")
        base["dragItems"]=items; base["dropZones"]=zones; base["dragCorrect"]=dc
    else:
        base["type"]=typ
        opts=q.get("o") or []
        base["options"]=[{"id":f"o{chr(65+i)}","text":o if isinstance(o,str) else o.get("text",o.get("t",""))} for i,o in enumerate(opts)]
        base["correctAnswers"]=[f"o{chr(65+int(x))}" for x in (q.get("a") or [])]
    rows.append(base)
out="// Generated by scripts/do_crop.py from source PDF — do not edit by hand.\nimport type { QuizQuestion } from \"@/types/quiz\";\n\nexport const QUESTIONS: QuizQuestion[] = "+json.dumps(rows,ensure_ascii=False,indent=1)+";\n"
open(QTS,"w").write(out)

from collections import Counter
types=Counter(r["type"] for r in rows)
multi=[r["number"] for r in rows if len(r["sourcePages"])>1]
print("QUESTIONS:",len(rows),"| PAGES: 121")
print("TYPES:",dict(types))
print("MULTI_PAGE:",len(multi),multi)
print("STEM_NOT_FOUND:",MISSING if MISSING else "NONE")
print("IMAGE_FILES:",sum(len(r["images"]) for r in rows))

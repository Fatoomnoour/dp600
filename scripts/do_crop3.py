import json, os, re, csv
import pymupdf as fitz
from collections import Counter
BASE="/dp600/"; OUT="public/assets/dp600/questions"; IDX="public/question-index.json"; QTS="src/data/questions.ts"
rows=list(csv.reader(open('/tmp/dp600.tsv',encoding='utf8',errors='replace'),delimiter='\t'))
hdr={n:i for i,n in enumerate(rows[0])}
lines={}
for r in rows[1:]:
    if len(r)<12: continue
    pg=r[hdr['page_num']]; bl=r[hdr['block_num']]; ln=r[hdr['line_num']]; top=float(r[hdr['top']]); t=r[hdr['text']]
    if t in ('###PAGE###','###FLOW###','###LINE###'): continue
    k=(pg,bl,ln)
    lines[k]=(top, lines[k][1]+' '+t) if k in lines else (top,t)
Q_LINE=re.compile(r'^Question:\s*(\d+)',re.I)
markers={}
for (pg,bl,ln),(top,t) in lines.items():
    m=Q_LINE.match(t.strip())
    if m: markers.setdefault(pg,[]).append((top,int(m.group(1))))
for pg in markers: markers[pg].sort()
doc=fitz.open("/home/user/uploaded_files/dp-600.pdf")
Q=json.load(open("/tmp/qdata.json"))
def qtext(q): return q.get("q") or (q.get("hotset") or [{}])[0].get("s") or ""
def qtype(q):
    if isinstance(q.get("hotset"),list) and len(q["hotset"]):
        ans=[str(x.get("yn",x.get("y",x.get("a","")))) for x in q["hotset"] if isinstance(x,dict)]
        if ans and all(a[:1].upper() in ("T","F") for a in ans if a): return "trueFalse"
        return "yesNo"
    if isinstance(q.get("blanks"),list) and len(q["blanks"]): return "dragDrop"
    return "multiple" if len(q.get("a") or [])>1 else "single"
import sys
used_markers=set(); NOQ=[] 
def crop(q):
    n=q["n"]; pgs=[int(x) for x in (q.get("pgs") or [])]
    if not pgs: NOQ.append(n); return []
    urls=[]; last=len(pgs)-1
    for i,p in enumerate(pgs):
        page=doc[p-1]; H=page.rect.height; W=page.rect.width
        pg=str(p)
        mk=markers.get(pg,[])
        # find marker for this question number on first page
        y0=0.0
        if i==0:
            cand=[(y,num) for y,num in mk if num==n]
            if cand:
                y0=max(0.0,cand[0][0]-8); used_markers.add((p,n))
            else:
                # fallback: marker at same index? use any next marker after prev q's marker
                prev=[(y,num) for y,num in mk if num<n]
                y0=prev[-1][0] if prev else 0.0
        if i==last:
            nxt=[y for y,num in mk if y>y0+20 and num>n]
            y1=(min(nxt)-8 if nxt else H-8)
        else:
            y1=H-6
        y1=min(y1,H); 
        if y1<y0+60: y1=min(H,y0+60)
        clip=fitz.Rect(0,min(y0,H-60),W,max(y1,y0+60))
        pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=clip)
        fname=f"q{n:03d}-page-{p:02d}.png"
        os.makedirs(os.path.dirname(os.path.join(OUT,fname)),exist_ok=True)
        pix.save(os.path.join(OUT,fname)); urls.append(f"{BASE}assets/dp600/questions/{fname}")
    return urls
CROP={}; INDEX=[]
for q in Q:
    n=q["n"]; urls=crop(q); CROP[n]=urls
    INDEX.append({"id":f"q{n:03d}","number":n,"sourcePages":[int(x) for x in (q.get("pgs") or [])],"type":qtype(q),"imageFiles":urls})
json.dump(INDEX,open(IDX,"w"),ensure_ascii=False,indent=2)
def normYN(v):
    s=str(v or "").lower()
    if s.startswith("y") or s.startswith("t"): return "Yes" if s.startswith("y") else "True"
    if s.startswith("n") or s.startswith("f"): return "No" if s.startswith("n") else "False"
    return str(v or "")
rows=[]
for q in Q:
    n=q["n"]; pgs=[int(x) for x in (q.get("pgs") or [])]
    base={"id":f"q{n:03d}","number":n,"sourcePages":pgs,"images":CROP[n],"fullImages":[f"{BASE}pages/p-{p:03d}.png" for p in pgs],"category":q.get("d") or "","question":qtext(q) or "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:","explanation":q.get("w") or "","reference":q.get("r") or ""}
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
open(QTS,"w").write("// Generated by scripts/do_crop3.py — do not edit by hand.\nimport type { QuizQuestion } from \"@/types/quiz\";\n\nexport const QUESTIONS: QuizQuestion[] = "+json.dumps(rows,ensure_ascii=False,indent=1)+";\n")
types=Counter(r["type"] for r in rows)
multi=[r["number"] for r in rows if len(r["sourcePages"])>1]
print("QUESTIONS:",len(rows),"| PAGES:121 | IMGS:",sum(len(r["images"]) for r in rows))
print("TYPES:",dict(types)); print("MULTI_PAGE:",len(multi))
print("Q_WITHOUT_MARKER:",len(NOQ),"| USED_MARKERS:",len(used_markers))

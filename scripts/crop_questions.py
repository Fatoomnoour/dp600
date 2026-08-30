#!/usr/bin/env python3
"""Crop every DP-600 question from the PDF as its own image.

Reads /tmp/qdata.json (102 questions with n, q, hotset, pgs, type info),
locates each question's stem on its first page, crops [stem..next-stem|page-end]
per source page at 2x zoom, writes:
  public/assets/dp600/questions/qNNN-page-PP.png
  public/question-index.json
  src/data/questions.ts  (regenerated with sourcePages + cropped images)
"""
import json, os, re, sys
import pymupdf as fitz

PDF = "/home/user/uploaded_files/dp-600.pdf"
QD = "/tmp/qdata.json"
OUTDIR = "public/assets/dp600/questions"
INDEXPATH = "public/question-index.json"
QTS_PATH = "src/data/questions.ts"
BASE = "/dp600/"
N_PAGES = 121

def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip()

def load_qdata():
    with open(QD) as f:
        return json.load(f)

doc = fitz.open(PDF)

# ---- build line maps per page (y0, text) once ----
line_cache = {}
def get_lines(pageno):
    if pageno not in line_cache:
        page = doc[pageno - 1]
        d = page.get_text("dict")
        lines = []
        for b in d["blocks"]:
            for l in b.get("lines", []):
                txt = norm("".join(sp["text"] for sp in l.get("spans", [])))
                if txt:
                    lines.append((l["bbox"][1], txt))
        lines.sort()
        line_cache[pageno] = lines
    return line_cache[pageno]

def find_stem_y(pageno, stem, fallback=0.0):
    needle = norm(stem)
    if not needle:
        return fallback
    lines = get_lines(pageno)
    n20 = needle[:20]
    for y, t in lines:
        if t.startswith(n20):
            return y
    n15 = needle[:15]
    for y, t in lines:
        if n15 and n15 in t:
            return y
    for y, t in lines:
        if needle[:10] in t:
            return y
    return None  # not found

# ---- for boundary detection: first-page start Y per question ----
Q = load_qdata()
starts_per_page = {}   # pageno -> list of (y, qnum)
stem_map = {}          # qnum -> stem text used
for q in Q:
    n = q["n"]
    stem = q.get("q") or (q.get("hotset") or [{}])[0].get("s") or ""
    stem_map[n] = stem
    pgs = q.get("pgs") or []
    if pgs:
        y = find_stem_y(pgs[0], stem)
        starts_per_page.setdefault(pgs[0], []).append((y if y is not None else -1, n))
for p in starts_per_page:
    starts_per_page[p].sort()

MISSING = []

def question_type(q):
    if isinstance(q.get("hotset"), list) and len(q["hotset"]):
        ans = [str(x.get("yn", x.get("y", x.get("a", "")))) for x in q["hotset"]]
        if ans and all(a.upper() in ("T", "TRUE", "F", "FALSE") for a in ans if a):
            return "trueFalse"
        return "yesNo"
    if isinstance(q.get("blanks"), list) and len(q["blanks"]):
        return "dragDrop"
    return "multiple" if (q.get("a") or []).__len__() > 1 else "single"

def crop_question(q):
    n = q["n"]
    pgs = q.get("pgs") or []
    if not pgs:
        return [], []
    files = []
    urls = []
    last = len(pgs) - 1
    for i, p in enumerate(pgs):
        page = doc[p - 1]
        H = page.rect.height
        W = page.rect.width
        y0, y1 = 0.0, H
        if i == 0:
            stem = stem_map.get(n, "")
            y = find_stem_y(p, stem)
            if y is None:
                e = (stem or "?")[:30]
                MISSING.append((n, p, e))
                y0 = 0.0
            else:
                y0 = max(0.0, y - 12)
        else:
            y0 = 0.0
        if i == last:
            # end at next question's stem start on the same page, else page end
            nxt = [yy for yy, nn in starts_per_page.get(p, []) if nn > n]
            if nxt:
                y1 = max(y0 + 60, min(nxt) - 10)
            else:
                y1 = H - 10
        else:
            y1 = H - 6
        clip = fitz.Rect(0, min(y0, H - 40), W, min(y1, H))
        mat = fitz.Matrix(2, 2)  # ~144 dpi
        pix = page.get_pixmap(matrix=mat, clip=clip)
        fname = f"q{n:03d}-page-{p:02d}.png"
        path = os.path.join(OUTDIR, fname)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        pix.save(path)
        files.append(path)
        urls.append(f"{BASE}assets/dp600/questions/{fname}")
    return files, urls

def build_questions_ts():
    rows = []
    for q in Q:
        n = q["n"]
        pgs = [int(x) for x in (q.get("pgs") or [])]
        urls = crop_cache[n][1]
        base = {
            "id": f"q{n:03d}",
            "number": n,
            "sourcePages": pgs,
            "images": urls,
            "fullImages": [f"{BASE}pages/p-{p:03d}.png" for p in pgs],
            "category": q.get("d") or "",
            "question": q.get("q") or (q.get("hotset") or [{}])[0].get("s") or "حدد صح أم خطأ (نعم/لا) لكل عبارة من العبارات التالية:",
            "explanation": q.get("w") or "",
            "reference": q.get("r") or "",
        }
        typ = question_type(q)
        if typ in ("yesNo", "trueFalse"):
            base["type"] = typ
            base["statements"] = [
                {"id": f"s{i}", "text": x.get("t", x.get("text", x.get("s", ""))) if isinstance(x, dict) else str(x),
                 "correctAnswer": str(x.get("yn", x.get("y", x.get("a", "")))) if isinstance(x, dict) else str(x)}
                for i, x in enumerate(q.get("hotset", []))
            ]
        elif typ == "dragDrop":
            base["type"] = "dragDrop"
            blanks = q.get("blanks") or []
            opts_of = lambda b: (b.get("options") or b.get("opts") or b.get("o") or []) if isinstance(b, dict) else (q.get("o") or [])
            label_of = lambda b, i: (b.get("lb") or b.get("label") or b.get("q") or b.get("t") or f"الفراغ {i+1}") if isinstance(b, dict) else b
            zones = [{"id": f"z{i}", "label": label_of(b, i)} for i, b in enumerate(blanks)]
            seen, items = set(), []
            for b in blanks:
                for o in opts_of(b):
                    t = o if isinstance(o, str) else o.get("text", o.get("t", ""))
                    if t and t not in seen:
                        seen.add(t)
                        items.append({"id": f"d{len(items)}", "text": t})
            idOf = {it["text"]: it["id"] for it in items}
            dragCorrect = {}
            for i, b in enumerate(blanks):
                bo = opts_of(b)
                a = b.get("a") if isinstance(b, dict) else None
                target = None
                if isinstance(a, int) and a < len(bo):
                    target = bo[a]
                w = target if isinstance(target, str) else (target.get("text") or target.get("t") or "") if isinstance(target, dict) else ""
                dragCorrect[f"z{i}"] = idOf.get(w, "")
            base["dragItems"] = items
            base["dropZones"] = zones
            base["dragCorrect"] = dragCorrect
        else:
            base["type"] = typ
            opts = q.get("o") or []
            base["options"] = [{"id": f"o{chr(65+i)}", "text": o if isinstance(o, str) else o.get("text", o.get("t", ""))} for i, o in enumerate(opts)]
            base["correctAnswers"] = [f"o{chr(65+int(x))}" for x in (q.get("a") or [])]
        rows.append(base)
    out = (
        "// Generated by scripts/crop_questions.py from the source PDF — do not edit by hand.\n"
        'import type { QuizQuestion } from "@/types/quiz";\n\n'
        "export const QUESTIONS: QuizQuestion[] = " +
        json.dumps(rows, ensure_ascii=False, indent=1) + ";\n"
    )
    with open(QTS_PATH, "w") as f:
        f.write(out)
    return rows

os.makedirs(OUTDIR, exist_ok=True)
crop_cache = {}
index = []
for q in Q:
    files, urls = crop_question(q)
    crop_cache[q["n"]] = (files, urls)
    index.append({
        "id": f"q{q['n']:03d}",
        "number": q["n"],
        "sourcePages": [int(x) for x in (q.get("pgs") or [])],
        "type": question_type(q),
        "imageFiles": urls,
    })

with open(INDEXPATH, "w") as f:
    json.dump(index, f, ensure_ascii=False, indent=2)

rows = build_questions_ts()

# Report
from collections import Counter
types = Counter(r["type"] for r in rows)
multi = [r["number"] for r in rows if len(r["sourcePages"]) > 1]
total_images = sum(len(r["images"]) for r in rows)
print("TOTAL_QUESTIONS:", len(rows))
print("TOTAL_SOURCE_PAGES:", N_PAGES)
print("TYPES:", dict(types))
print("MULTI_PAGE_QUESTION_COUNT:", len(multi))
print("MULTI_PAGE_LIST:", multi)
print("TOTAL_IMAGE_FILES:", total_images)
print("STEM_NOT_FOUND_ON_FIRST_PAGE:", MISSING if MISSING else "none")

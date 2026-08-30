import fs from "fs";
const raw = fs.readFileSync("/tmp/qdata.js", "utf8");
const Q = new Function("return " + raw.slice(raw.indexOf("["), raw.lastIndexOf("]") + 1))();
const pick = (obj, keys) => { for (const k of keys) if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k]; return undefined; };
const normYN = (v) => { const s = String(v ?? "").toLowerCase(); if (s.startsWith("y") || s.startsWith("t")) return s.startsWith("y") ? "Yes" : "True"; if (s.startsWith("n") || s.startsWith("f")) return s.startsWith("n") ? "No" : "False"; return String(v ?? ""); };
const BASE = "/dp600/";
const opts = (list) => (list ?? []).map((t, idx) => ({ id: "o" + String.fromCharCode(65 + idx), text: typeof t === "string" ? t : (t?.text ?? t?.t ?? String(t)) }));
const converted = Q.map((q) => {
  const n = q.n;
  const pages = Array.isArray(q.pgs) && q.pgs.length ? q.pgs : [parseInt(String(q.pg || "").replace(/\D/g, ""), 10) || n];
  const images = pages.filter((p) => p >= 1 && p <= 121).map((p) => `${BASE}pages/p-${String(p).padStart(3, "0")}.png`);
  const base = { id: "q" + String(n).padStart(3, "0"), number: n, category: q.d, question: pick(q, ["q", "question", "text", "t2"]) ?? "", explanation: q.w, reference: q.r, images };
  if (Array.isArray(q.hotset) && q.hotset.length) {
    return { ...base, type: "yesNo", statements: q.hotset.map((s, idx) => ({ id: "s" + idx, text: pick(s, ["t", "text", "st", "statement", "s", "q", "label"]) ?? "", correctAnswer: normYN(pick(s, ["y", "a", "ans", "answer", "correct", "v"])) })) };
  }
  if (Array.isArray(q.blanks) && q.blanks.length) {
    const blanks = q.blanks;
    const optsOf = (b) => typeof b === "string" ? opts(q.o) : opts(pick(b, ["options", "opts", "o", "choices"]) ?? q.o);
    const zones = blanks.map((b, idx) => ({ id: "z" + idx, label: typeof b === "string" ? b : pick(b, ["label", "q", "t", "title", "name", "text"]) ?? `الفراغ ${idx + 1}` }));
    const seen = new Set(); const items = [];
    blanks.forEach((b) => optsOf(b).forEach((o) => { if (!seen.has(o.text)) { seen.add(o.text); items.push({ id: "d" + items.length, text: o.text }); } }));
    const itemIdOfText = (t) => items.find((it) => it.text === t)?.id ?? "";
    const dragCorrect = {};
    blanks.forEach((b, bIdx) => {
      const bOpts = optsOf(b); let want; const a = q.a;
      if (Array.isArray(a)) {
        if (a.length === blanks.length && typeof a[bIdx] === "number") want = bOpts[a[bIdx]]?.text;
        else if (typeof a[0] === "string") want = a[bIdx];
        else want = bOpts[0]?.text;
      }
      dragCorrect["z" + bIdx] = itemIdOfText(String(want ?? ""));
    });
    return { ...base, type: "dragDrop", options: opts(q.o), dropZones: zones, dragItems: items, dragCorrect };
  }
  return { ...base, type: (q.a ?? []).length > 1 ? "multiple" : "single", options: opts(q.o), correctAnswers: (q.a ?? []).map((idx) => "o" + String.fromCharCode(65 + Number(idx))) };
});
const out = "// Generated via converter.mjs — do not edit by hand.\nimport type { QuizQuestion } from \"@/types/quiz\";\n\nexport const QUESTIONS: QuizQuestion[] = " + JSON.stringify(converted, null, 1) + ";\n";
fs.writeFileSync("src/data/questions.ts", out);
const types = {}; converted.forEach((c) => (types[c.type] = (types[c.type] || 0) + 1));
console.log("WROTE", converted.length, "questions | types:", JSON.stringify(types));
console.log("missing question stem:", converted.filter((c) => !c.question).map((c) => c.number).join(",") || "none");

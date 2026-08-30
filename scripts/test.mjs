// DP-600 automated tests — node --experimental-strip-types scripts/test.mjs
let failures = 0;
const t = (name, ok) => { if (!ok) { failures++; console.log("FAIL:", name); } else console.log("ok  :", name); };
const mem = {};
globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };

const { QUESTIONS } = await import("../src/data/questions.ts");
const L = await import("../src/lib/grading.ts");
const S = await import("../src/lib/storage.ts");

const singleQ = QUESTIONS.find(q => q.type === "single");
const multiQ = QUESTIONS.find(q => q.type === "multiple");
const yesQ = QUESTIONS.find(q => q.type === "yesNo");
const ddQ = QUESTIONS.find(q => q.type === "dragDrop");
t("data: has all 4 types present", !!(singleQ && multiQ && yesQ && ddQ));

/* --- single --- */
const sc = singleQ.correctAnswers[0];
const sw = singleQ.options.find(o => o.id !== sc).id;
t("single: correct", L.isSingleCorrect(sc, sc));
t("single: wrong", !L.isSingleCorrect(sw, sc));
t("single: grade T", L.gradeQuestion(singleQ, [sc]).correct === true);
t("single: grade F", L.gradeQuestion(singleQ, [sw]).correct === false);
t("single: empty F", L.gradeQuestion(singleQ, []).correct === false);

/* --- multiple --- */
t("multiple: exact reversed", L.isMultipleCorrect([...multiQ.correctAnswers].reverse(), multiQ.correctAnswers));
t("multiple: incomplete F", !L.isMultipleCorrect(multiQ.correctAnswers.slice(0, -1), multiQ.correctAnswers));
const extra = multiQ.options.find(o => !multiQ.correctAnswers.includes(o.id)).id;
t("multiple: extra F", !L.isMultipleCorrect([...multiQ.correctAnswers, extra], multiQ.correctAnswers));
t("multiple: only wrong F", !L.isMultipleCorrect([extra], multiQ.correctAnswers));
t("multiple: empty F", !L.isMultipleCorrect([], multiQ.correctAnswers));

/* --- yesNo --- */
const yc = {}; yesQ.statements.forEach(s => { yc[s.id] = s.correctAnswer; });
t("yesNo: all ok", L.isYesNoCorrect({ ...yc }, yc));
const bad = { ...yc }; const k0 = Object.keys(bad)[0]; bad[k0] = bad[k0] === "Yes" ? "No" : "Yes";
t("yesNo: one wrong F", !L.isYesNoCorrect(bad, yc));

/* --- hotspot fn --- */
t("hotspot: ok", L.isHotspotCorrect("A", "A"));
t("hotspot: wrong", !L.isHotspotCorrect("B", "A"));

/* --- dragDrop --- */
const dc = ddQ.dragCorrect; const okk = {}; Object.keys(dc).forEach(z => { okk[z] = dc[z]; });
t("dragdrop: all ok", L.isDragDropCorrect(okk, dc));
const db = { ...okk }; const z0 = Object.keys(db)[0];
db[z0] = ddQ.dragItems.find(d => d.id !== db[z0]).id;
t("dragdrop: one wrong F", !L.isDragDropCorrect(db, dc));

/* --- wrong answers: save once/dedupe/refresh/delete + rich fields --- */
S.clearWrong();
S.addWrong({ questionId: "q001", questionNumber: 1, sourcePages: [4], type: "single", selectedAnswer: ["A"], correctAnswer: ["B"], questionImages: ["/dp600/a.png"], explanation: "why" });
S.addWrong({ questionId: "q001", questionNumber: 1, sourcePages: [4], type: "single", selectedAnswer: ["A"], correctAnswer: ["B"], questionImages: ["/dp600/a.png"], explanation: "why" });
S.addWrong({ questionId: "q002", questionNumber: 2, sourcePages: [5, 6], type: "multiple", selectedAnswer: ["C"], correctAnswer: ["D","E"], questionImages: ["/dp600/b.png"], explanation: "why2" });
t("wrong: two distinct", S.loadWrong().length === 2);
t("wrong: dedupe", S.loadWrong().filter(w => w.questionId === "q001").length === 1);
const afterRefresh = JSON.parse(localStorage.getItem("dp600_wrong_answers") || "[]");
t("wrong: survives refresh", afterRefresh.length === 2);
t("wrong: rich fields + createdAt", afterRefresh.every(w => w.createdAt && w.questionNumber && w.sourcePages && w.explanation && w.questionImages));
S.removeWrong("q001");
t("wrong: delete one", S.loadWrong().length === 1 && S.loadWrong()[0].questionId === "q002");
S.clearWrong();
t("wrong: delete all", S.loadWrong().length === 0);

/* --- mode --- */
S.saveMode("training"); t("mode training", S.loadMode() === "training");
S.saveMode("exam"); t("mode exam", S.loadMode() === "exam");

/* --- bank integrity --- */
const fs = await import("fs");
t("bank: 102", QUESTIONS.length === 102);
t("bank: ids unique", new Set(QUESTIONS.map(q => q.id)).size === 102);
t("bank: sourcePages present", QUESTIONS.every(q => q.sourcePages && q.sourcePages.length > 0));
t("bank: images present", QUESTIONS.every(q => q.images && q.images.length > 0));
t("bank: images exist on disk", QUESTIONS.every(q => q.images.every(p => fs.existsSync("public" + p.replace("/dp600", "")))));
t("bank: no empty text", QUESTIONS.every(q => q.question && q.question.trim().length > 0));
t("bank: correct info", QUESTIONS.every(q => (q.correctAnswers && q.correctAnswers.length) || (q.statements && q.statements.length) || (q.dragCorrect && Object.keys(q.dragCorrect).length)));
t("bank: explanations", QUESTIONS.every(q => q.explanation && q.explanation.trim().length > 0));
t("bank: no dp-900", !JSON.stringify(QUESTIONS).toLowerCase().includes("dp-900"));
t("bank: no dup options", QUESTIONS.every(q => { const txts = (q.options || []).map(o => o.text); return new Set(txts).size === txts.length; }));
const idx = JSON.parse(fs.readFileSync("public/question-index.json", "utf8"));
t("bank: index 102", idx.length === 102);
t("bank: index ids unique", new Set(idx.map(e => e.id)).size === 102);
t("bank: index aligns", idx.every(e => { const q = QUESTIONS.find(x => x.id === e.id); return q && JSON.stringify(q.sourcePages) === JSON.stringify(e.sourcePages); }));

console.log("\n" + (failures === 0 ? "ALL TESTS PASSED" : failures + " TEST(S) FAILED"));
process.exit(failures === 0 ? 0 : 1);

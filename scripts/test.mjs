// DP-600 automated tests — node --experimental-strip-types scripts/test.mjs
let failures = 0;
const t = (name, ok) => { if (!ok) { failures++; console.log("FAIL:", name); } else console.log("ok  :", name); };

// localStorage mock (simulates persistence across refresh)
const mem = {};
globalThis.localStorage = {
  getItem: (k) => (k in mem ? mem[k] : null),
  setItem: (k, v) => { mem[k] = String(v); },
  removeItem: (k) => { delete mem[k]; },
};

const { QUESTIONS } = await import("../src/data/questions.ts");
const L = await import("../src/lib/grading.ts");
const S = await import("../src/lib/storage.ts");

const singleQ = QUESTIONS.find(q => q.type === "single");
const multiQ = QUESTIONS.find(q => q.type === "multiple");
const yesQ = QUESTIONS.find(q => q.type === "yesNo");
const ddQ = QUESTIONS.find(q => q.type === "dragDrop");
t("data: has all 4 types present", !!(singleQ && multiQ && yesQ && ddQ));

/* --- single --- */
const singleCorrectId = singleQ.correctAnswers[0];
const singleWrongId = singleQ.options.find(o => o.id !== singleCorrectId).id;
t("single: correct passes", L.isSingleCorrect(singleCorrectId, singleCorrectId));
t("single: wrong fails", !L.isSingleCorrect(singleWrongId, singleCorrectId));
t("single: grade correct", L.gradeQuestion(singleQ, [singleCorrectId]).correct === true);
t("single: grade wrong", L.gradeQuestion(singleQ, [singleWrongId]).correct === false);
t("single: empty answer not correct", L.gradeQuestion(singleQ, []).correct === false);

/* --- multiple: sorted exact match --- */
t("multiple: exact (reversed order) passes", L.isMultipleCorrect([...multiQ.correctAnswers].reverse(), multiQ.correctAnswers));
t("multiple: incomplete fails", !L.isMultipleCorrect(multiQ.correctAnswers.slice(0, -1), multiQ.correctAnswers));
const extraId = multiQ.options.find(o => !multiQ.correctAnswers.includes(o.id)).id;
t("multiple: correct+wrong extra fails", !L.isMultipleCorrect([...multiQ.correctAnswers, extraId], multiQ.correctAnswers));
t("multiple: only wrong fails", !L.isMultipleCorrect([extraId], multiQ.correctAnswers));
t("multiple: empty fails", !L.isMultipleCorrect([], multiQ.correctAnswers));

/* --- yesNo --- */
const yesCorr = {};
yesQ.statements.forEach(s => { yesCorr[s.id] = s.correctAnswer; });
t("yesNo: all correct passes", L.isYesNoCorrect({ ...yesCorr }, yesCorr));
const bad = { ...yesCorr };
const k0 = Object.keys(bad)[0];
bad[k0] = bad[k0] === "Yes" ? "No" : "Yes";
t("yesNo: one wrong fails", !L.isYesNoCorrect(bad, yesCorr));

/* --- hotspot (unit fn; data bank has none by design) --- */
t("hotspot: right zone passes", L.isHotspotCorrect("zoneA", "zoneA"));
t("hotspot: wrong zone fails", !L.isHotspotCorrect("zoneB", "zoneA"));

/* --- dragDrop --- */
const ddCorr = ddQ.dragCorrect;
const ddOk = {};
Object.keys(ddCorr).forEach(z => { ddOk[z] = ddCorr[z]; });
t("dragDrop: all correct passes", L.isDragDropCorrect(ddOk, ddCorr));
const ddBad = { ...ddOk };
const z0 = Object.keys(ddBad)[0];
const otherItem = ddQ.dragItems.find(d => d.id !== ddBad[z0]).id;
ddBad[z0] = otherItem;
t("dragDrop: one wrong fails", !L.isDragDropCorrect(ddBad, ddCorr));

/* --- wrong-answers storage: save once, dedupe, refresh, delete --- */
S.clearWrong();
S.addWrong({ questionId: "q001", selectedAnswer: ["A"], correctAnswer: ["B"] });
S.addWrong({ questionId: "q001", selectedAnswer: ["A"], correctAnswer: ["B"] }); // duplicate
S.addWrong({ questionId: "q002", selectedAnswer: ["C"], correctAnswer: ["D"] });
t("wrong: two distinct saved", S.loadWrong().length === 2);
t("wrong: dedupe works (q001 once)", S.loadWrong().filter(w => w.questionId === "q001").length === 1);
// simulate refresh (reload from same localStorage mock)
const afterRefresh = JSON.parse(localStorage.getItem("dp600_wrong_answers") || "[]");
t("wrong: survives refresh (localStorage)", afterRefresh.length === 2 && afterRefresh[0].questionId === "q001");
t("wrong: only saved after check (no stray entries)", afterRefresh.every(w => w.attemptedAt && w.selectedAnswer && w.correctAnswer));
S.removeWrong("q001");
t("wrong: delete one works", S.loadWrong().length === 1 && S.loadWrong()[0].questionId === "q002");
S.clearWrong();
t("wrong: delete all works", S.loadWrong().length === 0);

/* --- mode persistence --- */
S.saveMode("training");
t("mode: persists training", S.loadMode() === "training");
S.saveMode("exam");
t("mode: persists exam", S.loadMode() === "exam");

/* --- data integrity --- */
t("data: 102 questions", QUESTIONS.length === 102);
t("data: ids unique", new Set(QUESTIONS.map(q => q.id)).size === 102);
t("data: no empty question text", QUESTIONS.every(q => q.question && q.question.trim().length > 0));
t("data: every question has correct info", QUESTIONS.every(q => (q.correctAnswers && q.correctAnswers.length) || (q.statements && q.statements.length) || (q.dragCorrect && Object.keys(q.dragCorrect).length)));
t("data: every question has explanation", QUESTIONS.every(q => q.explanation && q.explanation.trim().length > 0));
t("data: no dp-900 content", !JSON.stringify(QUESTIONS).toLowerCase().includes("dp-900"));
t("data: no duplicate option texts per question", QUESTIONS.every(q => { const txts = (q.options || []).map(o => o.text); return new Set(txts).size === txts.length; }));

console.log("\n" + (failures === 0 ? "ALL TESTS PASSED" : failures + " TEST(S) FAILED"));
process.exit(failures === 0 ? 0 : 1);

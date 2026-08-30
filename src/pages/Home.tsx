import { useLocation } from "wouter";
import { TopBar, Chip } from "@/components/Navbar";
import { QUESTIONS } from "@/data/questions";
import { loadAnswers, loadBookmarks, loadConfig, saveConfig } from "@/lib/storage";
import type { AppConfig } from "@/lib/storage";
import { useState } from "react";

const MODS = [
  {
    id: "full",
    title: "الامتحان الكامل",
    desc: "جميع الأسئلة الـ102 بترتيب الأصل — محاكاة فعلية لامتحان DP-600",
    minutes: 100,
    icon: "🏆",
  },
  {
    id: "quick",
    title: "مراجعة سريعة",
    desc: "20 سؤالاً عشوائياً مع مؤقت قصير — لمراجعة يومية سريعة",
    minutes: 15,
    icon: "⚡",
  },
];

export default function Home() {
  const [, nav] = useLocation();
  const [cfg, setCfg] = useState<AppConfig>(loadConfig);
  const answers = loadAnswers();
  const bookmarks = loadBookmarks();
  const done = Object.values(answers).filter((m) => m._submitted).length;
  const attempted = Object.values(QUESTIONS).filter((q) => {
    const a = answers["full"]?.[q.id];
    return Array.isArray(a) && a.length > 0;
  }).length;

  const answered = Object.keys(bookmarks).length;

  const start = (id: string, qtype: "full" | "quick") => {
    const m = MODS.find((x) => x.id === id)!;
    if (qtype === "quick") {
      sessionStorage.setItem("dp600_quick_minutes", String(cfg.timerMinutes));
      nav("/quiz/quick");
    } else {
      sessionStorage.setItem("dp600_full_minutes", String(cfg.timerMinutes));
      nav("/quiz/full");
    }
  };

  const stats = [
    { label: "إجمالي الأسئلة", value: QUESTIONS.length, color: "var(--violet2)" },
    { label: "أسئلة أجبت عنها", value: attempted, color: "var(--teal)" },
    { label: "محاولات أُرسِلت", value: done, color: "var(--amber)" },
    { label: "مفضلة", value: answered, color: "var(--pink, #ec4899)" },
  ];

  return (
    <div>
      <TopBar>
        <Chip>Microsoft Fabric</Chip>
        <Chip cls="" >102 سؤال</Chip>
      </TopBar>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "1.2rem" }}>
        {/* hero */}
        <div className="card" style={{ background: "linear-gradient(135deg,#4c1d95,#6d28d9 60%,#0e7490)", border: "none", padding: "1.6rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800 }}>محاكي امتحان DP-600</h1>
          <p style={{ margin: "0.4rem 0 0", color: "#d8c7ff", lineHeight: 1.7 }}>
            تحضير تفاعلي لشهادة <b>Microsoft Fabric Analytics Engineer</b> — 102 سؤالاً تغطي النمذجة الدلالية، متاجر Lakehouse، تحويلات البيانات، الذكاء في Fabric، والأمان.
          </p>
          <p style={{ margin: "0.6rem 0 0", color: "#ffe4a3", fontSize: "0.85rem" }}>
            ⚠ المحتوى للمراجعة التعليمية ولا يمثل أسئلة الامتحان الرسمية. المرجع الرسمي:{" "}
            <a href="https://learn.microsoft.com/credentials/certifications/fabric-analytics-engineer/" target="_blank" rel="noreferrer" style={{ color: "#7ee8fa" }}>
              Microsoft Learn
            </a>
          </p>
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.8rem" }}>
          {stats.map((s) => (
            <div key={s.label} className="card" style={{ textAlign: "center", padding: "0.9rem" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }} className="num-ltr">{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--mut)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* methods */}
        <div style={{ display: "grid", gap: "0.9rem" }}>
          {MODS.map((m) => (
            <div key={m.id} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "2rem" }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{m.title}</div>
                <div style={{ color: "var(--mut)", fontSize: "0.88rem", lineHeight: 1.6 }}>{m.desc}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--teal)", fontWeight: 700 }}>⏱ {cfg.timerMinutes} دقيقة</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-violet" onClick={() => start(m.id, m.id as "full" | "quick")}>ابدأ الآن</button>
              </div>
            </div>
          ))}
        </div>

        {/* settings */}
        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: "0.7rem" }}>الإعدادات</div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.7rem", flexWrap: "wrap", fontSize: "0.92rem" }}>
            مدة الامتحان بالدقائق:
            <input
              type="number" min={5} max={300} value={cfg.timerMinutes}
              onChange={(e) => {
                const v = Math.max(5, Math.min(300, Number(e.target.value) || 100));
                const next = { ...cfg, timerMinutes: v };
                setCfg(next);
                saveConfig(next);
              }}
              style={{ width: "90px", padding: "0.4rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--panel2)", color: "var(--txt)", fontFamily: "inherit" }}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.7rem", fontSize: "0.92rem", cursor: "pointer" }}>
            <input type="checkbox" checked={cfg.sound} onChange={(e) => {
              const next = { ...cfg, sound: e.target.checked };
              setCfg(next); saveConfig(next);
            }} /> تفعيل الأصوات
          </label>
        </div>

        {/* secondary nav */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "0.8rem" }}>
          <button className="btn btn-ghost" style={{ padding: "1rem" }} onClick={() => nav("/mistakes")}>📕 مراجعة الأخطاء</button>
          <button className="btn btn-ghost" style={{ padding: "1rem" }} onClick={() => nav("/bookmarks")}>⭐ المفضلة</button>
        </div>
      </div>
    </div>
  );
}

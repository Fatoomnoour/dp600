import { TopBar, Chip } from "@/components/Navbar";
import { allQuestions } from "@/lib/loadQuestions";
import { loadBookmarks } from "@/lib/storage";
import { useMemo } from "react";

export default function Bookmarks() {
  const books = loadBookmarks();
  const list = useMemo(() => allQuestions().filter((q) => books[q.id]), [books]);
  return (
    <div>
      <TopBar>
        <Chip>⭐ المفضلة</Chip>
        <Chip cls="">{list.length} سؤال</Chip>
      </TopBar>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "1.2rem 1rem 3rem", display: "grid", gap: "0.8rem" }}>
        {list.length === 0 && (
          <div className="card" style={{ textAlign: "center", color: "var(--mut)" }}>
            لا توجد أسئلة مفضلة بعد — اضغط ☆ في صفحة السؤال لإضافتها.
          </div>
        )}
        {list.map((q) => (
          <div key={q.id} className="card">
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
              <span style={{ flex: "none", background: "var(--amber)", color: "#3b2500", borderRadius: "0.45rem", padding: "0.1rem 0.5rem", fontWeight: 800 }} className="num-ltr">{q.number}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, lineHeight: 1.7 }}>{q.question}</div>
                {q.explanation && <div style={{ fontSize: "0.85rem", color: "var(--mut)", lineHeight: 1.7, marginTop: "0.4rem" }}>{q.explanation}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

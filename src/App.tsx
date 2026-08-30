import { Redirect, Route, Switch, Router as Wouter, useLocation } from "wouter";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Mistakes from "@/pages/Mistakes";
import Bookmarks from "@/pages/Bookmarks";

function App() {
  return (
    <Wouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quiz/full"><Redirect to="/quiz/module-full" replace /></Route>
        <Route path="/quiz/quick"><Redirect to="/quiz/module-quick" replace /></Route>
        <Route path="/quiz/:moduleId" component={Quiz} />
        <Route path="/results/:moduleId" component={Results} />
        <Route path="/mistakes" component={Mistakes} />
        <Route path="/bookmarks" component={Bookmarks} />
        <Route component={NotFound} />
      </Switch>
    </Wouter>
  );
}

function NotFound() {
  const [, nav] = useLocation();
  return (
    <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h2>الصفحة غير موجودة</h2>
      <button className="btn btn-violet" onClick={() => nav("/")}>العودة للرئيسية</button>
    </div>
  );
}

export default App;

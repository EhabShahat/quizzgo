import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import Questions from "./pages/Questions";
import ScorePage from "./pages/ScorePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/scores" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
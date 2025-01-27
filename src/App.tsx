import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import Questions from "./pages/Questions";
import ScorePage from "./pages/ScorePage";
import ExternalDatabasePage from "./pages/ExternalDatabasePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/scores" element={<ScorePage />} />
        <Route path="/external-database" element={<ExternalDatabasePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminPanel from "./pages/AdminPanel";
import Questions from "./pages/Questions";
import ScorePage from "./pages/ScorePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/scores" element={<ScorePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

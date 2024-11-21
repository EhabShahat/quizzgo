import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import AdminPanel from "./pages/AdminPanel";
import WelcomeScreen from "./components/quiz/WelcomeScreen";
import ScorePage from "./pages/ScorePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome/:username" element={<WelcomeScreen />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/scores" element={<ScorePage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
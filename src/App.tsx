import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuizStore } from "@/store/quizStore";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import AdminPanel from "./pages/AdminPanel";
import WelcomeScreen from "./components/quiz/WelcomeScreen";
import ScorePage from "./pages/ScorePage";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { setEnabled } = useQuizStore();
  const showFooter = !['/questions', '/admin'].includes(location.pathname) && 
    !location.pathname.startsWith('/questions/');

  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_settings')
          .select('is_enabled')
          .single();
        
        if (error) throw error;
        
        if (data) {
          setEnabled(data.is_enabled);
        }
      } catch (error) {
        console.error('Error checking quiz status:', error);
      }
    };

    checkQuizStatus();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('quiz_settings_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quiz_settings',
        },
        (payload) => {
          setEnabled(payload.new.is_enabled);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setEnabled]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/welcome/:username/:inviteCode" element={<WelcomeScreen />} />
        <Route path="/questions/:inviteCode" element={<Questions />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/scores" element={<ScorePage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
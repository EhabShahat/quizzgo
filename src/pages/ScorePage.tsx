import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { PodiumStand } from "@/components/leaderboard/PodiumStand";
import { RunnerUp } from "@/components/leaderboard/RunnerUp";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";

const ScorePage = () => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch scores from Supabase using React Query
  const { data: scores = [], isLoading, error } = useQuery({
    queryKey: ['leaderboard-scores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleAdminAccess = () => {
    if (!showAdminInput) {
      setShowAdminInput(true);
      return;
    }

    if (adminPassword === "admin123") {
      navigate("/admin");
      toast({
        title: "Success",
        description: "Welcome to admin panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
    setAdminPassword("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4C1D95] to-[#6366F1] p-4 md:p-8 relative overflow-hidden flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full bg-white/5 border-white/10">
            <Alert className="bg-transparent border-white/10">
              <AlertCircle className="h-4 w-4 text-white" />
              <AlertDescription className="text-white">
                Loading scores...
              </AlertDescription>
            </Alert>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4C1D95] to-[#6366F1] p-4 md:p-8 relative overflow-hidden flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full bg-white/5 border-white/10">
            <Alert className="bg-transparent border-white/10">
              <AlertCircle className="h-4 w-4 text-white" />
              <AlertDescription className="text-white">
                Error loading scores. Please try again.
              </AlertDescription>
            </Alert>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4C1D95] to-[#6366F1] p-4 md:p-8 relative overflow-hidden flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full bg-white/5 border-white/10">
            <Alert className="bg-transparent border-white/10">
              <AlertCircle className="h-4 w-4 text-white" />
              <AlertDescription className="text-white">
                Waiting for quiz participants to complete their sessions...
              </AlertDescription>
            </Alert>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4C1D95] to-[#6366F1] p-4 md:p-8 relative overflow-hidden flex flex-col">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: "8px",
            height: "8px",
            background: `${['#FF4D4D', '#FFD700', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)]}`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `float ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <div className="flex-grow">
        <Card className="max-w-4xl mx-auto space-y-8 bg-transparent border-none shadow-none">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 animate-fadeIn">
          Winners
        </h1>

        {/* Podium Section */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-12">
          {/* 2nd Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            {scores[1] && (
              <PodiumStand
                rank={2}
                name={scores[1].participant_name}
                score={scores[1].score}
                correctAnswers={scores[1].correct_answers}
                totalQuestions={scores[1].total_questions}
              />
            )}
          </div>
          {/* 1st Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            {scores[0] && (
              <PodiumStand
                rank={1}
                name={scores[0].participant_name}
                score={scores[0].score}
                correctAnswers={scores[0].correct_answers}
                totalQuestions={scores[0].total_questions}
              />
            )}
          </div>
          {/* 3rd Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            {scores[2] && (
              <PodiumStand
                rank={3}
                name={scores[2].participant_name}
                score={scores[2].score}
                correctAnswers={scores[2].correct_answers}
                totalQuestions={scores[2].total_questions}
              />
            )}
          </div>
        </div>

        {/* Runners Up Section */}
        {scores.length > 3 && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="bg-[#3C1278]/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white/90 mb-4">Runners Up</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scores.slice(3).map((score, index) => (
                  <div 
                    key={index} 
                    className="animate-fadeIn"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <RunnerUp
                      rank={index + 4}
                      name={score.participant_name}
                      score={score.score}
                      correctAnswers={score.correct_answers}
                      totalQuestions={score.total_questions}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-12 pt-8">
          {showAdminInput && (
            <Input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="max-w-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
              autoFocus
            />
          )}
          <button 
            className="text-white/50 text-sm flex items-center gap-2 hover:text-white transition-colors bg-[#3C1278]/30 px-4 py-2 rounded-lg hover:bg-[#3C1278]/50"
            onClick={handleAdminAccess}
          >
            <Lock className="w-4 h-4" />
            Admin Access
          </button>
        </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ScorePage;
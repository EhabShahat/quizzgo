import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { PodiumStand } from "@/components/leaderboard/PodiumStand";
import { RunnerUp } from "@/components/leaderboard/RunnerUp";
import { Card } from "@/components/ui/card";
import { useScoresStore } from "@/store/scoresStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ScorePage = () => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { scores } = useScoresStore();

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

  if (scores.length === 0) {
    return (
      <div className="min-h-screen bg-[#4C1D95] p-4 md:p-8 relative overflow-hidden flex items-center justify-center">
        <Card className="max-w-md w-full bg-white/5 border-white/10">
          <Alert className="bg-transparent border-white/10">
            <AlertCircle className="h-4 w-4 text-white" />
            <AlertDescription className="text-white">
              Waiting for quiz participants to complete their sessions...
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4C1D95] p-4 md:p-8 relative overflow-hidden">
      {/* Confetti Animation */}
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

      <Card className="max-w-4xl mx-auto space-y-8 bg-transparent border-none shadow-none">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 animate-fadeIn">
          Leaderboard
        </h1>

        {/* Podium Section */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-12">
          {/* 2nd Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            {scores[1] && (
              <PodiumStand
                rank={2}
                name={scores[1].participantName || scores[1].username}
                score={scores[1].score}
                correctAnswers={scores[1].correctAnswers}
                totalQuestions={scores[1].totalQuestions}
              />
            )}
          </div>
          {/* 1st Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            {scores[0] && (
              <PodiumStand
                rank={1}
                name={scores[0].participantName || scores[0].username}
                score={scores[0].score}
                correctAnswers={scores[0].correctAnswers}
                totalQuestions={scores[0].totalQuestions}
              />
            )}
          </div>
          {/* 3rd Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            {scores[2] && (
              <PodiumStand
                rank={3}
                name={scores[2].participantName || scores[2].username}
                score={scores[2].score}
                correctAnswers={scores[2].correctAnswers}
                totalQuestions={scores[2].totalQuestions}
              />
            )}
          </div>
        </div>

        {/* Runners Up Section */}
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
                    name={score.participantName || score.username}
                    score={score.score}
                    correctAnswers={score.correctAnswers}
                    totalQuestions={score.totalQuestions}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Access Section */}
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
  );
};

export default ScorePage;
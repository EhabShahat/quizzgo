import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { PodiumStand } from "@/components/leaderboard/PodiumStand";
import { RunnerUp } from "@/components/leaderboard/RunnerUp";
import { Card } from "@/components/ui/card";

const ScorePage = () => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Placeholder data - replace with your actual data
  const scores = [
    { name: "Johannes", score: 6895, correctAnswers: 7, totalQuestions: 8 },
    { name: "Jennie", score: 5928, correctAnswers: 6, totalQuestions: 8 },
    { name: "Victoria", score: 5848, correctAnswers: 6, totalQuestions: 8 },
    { name: "Winner", score: 5500, correctAnswers: 6, totalQuestions: 8 },
    { name: "iLNzeJ", score: 5200, correctAnswers: 6, totalQuestions: 8 }
  ];

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
            <PodiumStand {...scores[1]} rank={2} />
          </div>
          {/* 1st Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <PodiumStand {...scores[0]} rank={1} />
          </div>
          {/* 3rd Place */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <PodiumStand {...scores[2]} rank={3} />
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
                  <RunnerUp {...score} rank={index + 4} />
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock, Sparkles } from "lucide-react";
import { PodiumStand } from "@/components/leaderboard/PodiumStand";
import { RunnerUp } from "@/components/leaderboard/RunnerUp";

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
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] p-4 md:p-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <Sparkles
            className="text-white/50 w-6 h-6"
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </div>
      ))}

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Leaderboard
        </h1>

        {/* Podium Section */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-12">
          {/* 2nd Place */}
          <PodiumStand {...scores[1]} rank={2} />
          {/* 1st Place */}
          <PodiumStand {...scores[0]} rank={1} />
          {/* 3rd Place */}
          <PodiumStand {...scores[2]} rank={3} />
        </div>

        {/* Runners Up Section */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white/90 mb-4">Runners Up</h2>
          {scores.slice(3).map((score, index) => (
            <RunnerUp key={index} {...score} rank={index + 4} />
          ))}
        </div>

        {/* Admin Access Section */}
        <div className="flex flex-col items-center gap-4 mt-12">
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
            className="text-white/50 text-sm flex items-center gap-2 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-lg"
            onClick={handleAdminAccess}
          >
            <Lock className="w-4 h-4" />
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;

import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Star, Sparkles, Lock, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { playCheerSound } from "@/utils/audio";

interface ScoreDisplayProps {
  score: number;
  questions: any[];
  correctAnswers: number;
  totalQuestions: number;
  inviteCode?: string;
}

export const ScoreDisplay = ({ score, questions, correctAnswers, totalQuestions }: ScoreDisplayProps) => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const maxPossibleScore = questions.length * 1000;
  const percentage = (score / maxPossibleScore) * 100;
  const rank = percentage >= 80 ? "Amazing!" : percentage >= 60 ? "Great!" : "Good try!";
  const emoji = percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : "👏";

  // Play cheer sound on component mount
  useEffect(() => {
    playCheerSound();
    
    // Automatically redirect to scores page after a short delay
    const timer = setTimeout(() => {
      navigate("/scores");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-purple-800 overflow-hidden">
      <div className="glass-card p-4 sm:p-8 max-w-lg w-full relative animate-scaleIn">
        {/* Background animations */}
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
            {i % 2 === 0 ? (
              <Star className="text-yellow-300 w-4 h-4 opacity-75" fill="currentColor" />
            ) : (
              <Sparkles className="text-white/50 w-6 h-6" />
            )}
          </div>
        ))}

        {/* Main content */}
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 animate-bounce">
              {emoji} {rank}
            </h1>
            
            <div className="flex justify-center mb-4 sm:mb-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              {percentage >= 60 && <Trophy className="w-16 sm:w-20 h-16 sm:h-20 text-yellow-400 animate-pulse" />}
              {percentage >= 40 && percentage < 60 && <Medal className="w-16 sm:w-20 h-16 sm:h-20 text-silver-400 animate-pulse" />}
              {percentage < 40 && <Award className="w-16 sm:w-20 h-16 sm:h-20 text-bronze-400 animate-pulse" />}
            </div>

            <div className="bg-black/30 p-4 sm:p-6 rounded-xl backdrop-blur-sm animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl sm:text-6xl font-bold text-primary-foreground mb-2 animate-pulse">{score}</div>
              <div className="text-lg sm:text-xl text-white/80">points</div>
            </div>

            <div className="space-y-4 mt-6 sm:mt-8">
              <div className="bg-black/20 p-3 sm:p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                <div className="text-base sm:text-lg text-white/90 mb-2">Your Score</div>
                <Progress value={percentage} className="h-3 sm:h-4" />
                <div className="text-xs sm:text-sm text-white/70 mt-2">{Math.round(percentage)}% of max score</div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="bg-black/20 p-3 sm:p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{correctAnswers}/{totalQuestions}</div>
                  <div className="text-xs sm:text-sm text-white/70">Questions</div>
                </div>
                <div className="bg-black/20 p-3 sm:p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{Math.round(percentage)}%</div>
                  <div className="text-xs sm:text-sm text-white/70">Accuracy</div>
                </div>
              </div>
            </div>

            {/* View Scores Button */}
            <button
              onClick={() => navigate("/scores")}
              className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-fadeIn"
              style={{ animationDelay: "0.7s" }}
            >
              <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
              View All Scores
            </button>
          </div>
        </div>

        {/* Admin Access Section */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
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
            className="text-white/50 text-xs sm:text-sm flex items-center gap-2 hover:text-white transition-colors animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
            onClick={() => {
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
            }}
          >
            <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
};

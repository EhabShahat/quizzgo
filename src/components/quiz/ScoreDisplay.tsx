import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Star, Sparkles } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  questions: any[];
}

export const ScoreDisplay = ({ score, questions }: ScoreDisplayProps) => {
  const maxPossibleScore = questions.length * 1000;
  const percentage = (score / maxPossibleScore) * 100;
  const rank = percentage >= 80 ? "Amazing!" : percentage >= 60 ? "Great!" : "Good try!";
  const emoji = percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : "👏";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-purple-800 overflow-hidden">
      <div className="glass-card p-8 max-w-lg w-full relative animate-scaleIn">
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
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white mb-2 animate-bounce">
              {emoji} {rank}
            </h1>
            
            <div className="flex justify-center mb-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              {percentage >= 60 && <Trophy className="w-20 h-20 text-yellow-400 animate-pulse" />}
              {percentage >= 40 && percentage < 60 && <Medal className="w-20 h-20 text-silver-400 animate-pulse" />}
              {percentage < 40 && <Award className="w-20 h-20 text-bronze-400 animate-pulse" />}
            </div>

            <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <div className="text-6xl font-bold text-primary-foreground mb-2 animate-pulse">{score}</div>
              <div className="text-xl text-white/80">points</div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                <div className="text-lg text-white/90 mb-2">Your Score</div>
                <Progress value={percentage} className="h-4" />
                <div className="text-sm text-white/70 mt-2">{Math.round(percentage)}% of max score</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                  <div className="text-3xl font-bold text-white">{questions.length}</div>
                  <div className="text-sm text-white/70">Questions</div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                  <div className="text-3xl font-bold text-white">{Math.round(percentage)}%</div>
                  <div className="text-sm text-white/70">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
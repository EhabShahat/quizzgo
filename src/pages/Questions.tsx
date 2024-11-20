import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { Timer, Star, Sparkles, Trophy, Medal, Award } from "lucide-react";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setShowScore(true);
      return;
    }
    
    if (!currentQuestion) return;
    
    const questionTimeLimit = currentQuestion.timeLimit;
    setTimeLeft(questionTimeLimit);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setCurrentQuestionIndex(prev => prev + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, currentQuestion]);

  if (showScore) {
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
                {percentage >= 60 && (
                  <Trophy className="w-20 h-20 text-yellow-400 animate-pulse" />
                )}
                {percentage >= 40 && percentage < 60 && (
                  <Medal className="w-20 h-20 text-silver-400 animate-pulse" />
                )}
                {percentage < 40 && (
                  <Award className="w-20 h-20 text-bronze-400 animate-pulse" />
                )}
              </div>

              <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                <div className="text-6xl font-bold text-primary-foreground mb-2 animate-pulse">
                  {score}
                </div>
                <div className="text-xl text-white/80">
                  points
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                  <div className="text-lg text-white/90 mb-2">
                    Your Score
                  </div>
                  <Progress value={percentage} className="h-4" />
                  <div className="text-sm text-white/70 mt-2">
                    {Math.round(percentage)}% of max score
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                    <div className="text-3xl font-bold text-white">
                      {questions.length}
                    </div>
                    <div className="text-sm text-white/70">
                      Questions
                    </div>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                    <div className="text-3xl font-bold text-white">
                      {Math.round(percentage)}%
                    </div>
                    <div className="text-sm text-white/70">
                      Accuracy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / currentQuestion.timeLimit) * 1000);
      setScore(prev => prev + timeBonus);
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">QuizMaster</h1>
          <p className="text-white/80">Test your knowledge!</p>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 space-y-8">
          {/* Question Header */}
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-lg">
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
            <div className="flex items-center gap-2 bg-[#2D2D3A] px-4 py-2 rounded-full">
              <Timer className="w-4 h-4 text-white" />
              <span className="text-white font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-white text-center">
            {currentQuestion.text}
          </h2>

          {/* Answer Options */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-6 rounded-xl text-white text-xl font-bold transition-transform hover:scale-105 text-center"
                style={{ backgroundColor: colors[index] }}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress 
              value={(timeLeft / currentQuestion.timeLimit) * 100} 
              className="h-2 bg-white/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;

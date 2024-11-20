import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    if (!currentQuestion) {
      setShowScore(true);
      return;
    }
    
    setTimeLeft(currentQuestion.timeLimit);
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
  }, [currentQuestion]);

  if (showScore) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-purple-800">
        <div className="glass-card p-8 animate-[scale-in_0.5s_ease-out] relative overflow-hidden">
          {/* Sparkle animations */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[fade-in_1s_ease-out_infinite]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles className="text-yellow-300 w-6 h-6" />
            </div>
          ))}
          
          <h2 className="text-4xl font-bold text-white mb-4 animate-[fade-in_0.5s_ease-out]">
            Quiz Complete! 🎉
          </h2>
          <div className="relative animate-[scale-in_0.7s_ease-out]">
            <p className="text-3xl font-bold text-white mb-4">
              Final Score:
            </p>
            <p className="text-5xl font-bold text-primary-foreground animate-[bounce_1s_ease-in-out_infinite]">
              {score} points
            </p>
          </div>
          <p className="text-lg text-white/80 mt-6 animate-[fade-in_0.9s_ease-out]">
            Thank you for participating!
          </p>
        </div>
      </div>
    );
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary to-purple-800">
      {/* Timer and Question Section */}
      <div className="p-8">
        <div className="mb-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Question {currentQuestionIndex + 1}</h2>
              <p className="text-white/80">Score: {score}</p>
            </div>
            <span className="text-2xl font-bold text-white">{timeLeft}s</span>
          </div>
          <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-3" />
        </div>
        
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <h3 className="text-2xl text-white text-center mb-4">{currentQuestion.text}</h3>
        </div>
      </div>

      {/* Answer Options Grid - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-4xl">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              style={{ backgroundColor: colors[index] }}
              className="p-6 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 animate-fade-in"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
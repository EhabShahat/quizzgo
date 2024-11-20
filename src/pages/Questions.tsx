import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Star } from "lucide-react";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    // Check if we've reached the end of questions
    if (currentQuestionIndex >= questions.length) {
      setShowScore(true);
      return;
    }
    
    const questionTimeLimit = questions[currentQuestionIndex]?.timeLimit || 10;
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
  }, [currentQuestionIndex]);

  if (showScore) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-purple-800 overflow-hidden">
        <div className="glass-card p-8 max-w-lg w-full relative">
          {/* Floating stars animation */}
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
              <Star
                className="text-yellow-300 w-4 h-4 opacity-75"
                fill="currentColor"
                style={{ transform: `rotate(${Math.random() * 360}deg)` }}
              />
            </div>
          ))}
          
          {/* Sparkle effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles className="text-white/50 w-6 h-6" />
            </div>
          ))}

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl font-bold text-white mb-4 animate-bounce">
              Quiz Complete! 🎉
            </h2>
            
            <div className="space-y-4 animate-fade-in">
              <div className="relative">
                <div className="text-2xl font-bold text-white mb-2">
                  Your Score:
                </div>
                <div className="text-6xl font-bold text-primary-foreground animate-pulse">
                  {score}
                </div>
                <div className="text-xl text-white/80 mt-2">
                  points
                </div>
              </div>
              
              <div className="mt-8 space-y-4 animate-fade-in">
                <p className="text-lg text-white/90">
                  Amazing performance! 🌟
                </p>
                <p className="text-white/70">
                  Thanks for participating in the quiz!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we don't have a current question, don't render anything
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

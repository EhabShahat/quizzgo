import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const { toast } = useToast();
  const currentQuestion = questions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    if (!currentQuestion) return;
    
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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-purple-800">
        <div className="glass-card p-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete! 🎉</h2>
          <p className="text-xl text-white/90">Thank you for participating.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary to-purple-800">
      {/* Timer and Question Section */}
      <div className="p-8 flex-1">
        <div className="mb-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-white">Question {currentQuestionIndex + 1}</h2>
            <span className="text-2xl font-bold text-white">{timeLeft}s</span>
          </div>
          <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-3" />
        </div>
        
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <h3 className="text-2xl text-white text-center mb-4">{currentQuestion.text}</h3>
        </div>
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 mt-auto">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            style={{ backgroundColor: colors[index] }}
            className="p-6 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 animate-fade-in"
            onClick={() => {
              if (option === currentQuestion.correctAnswer) {
                toast({
                  title: "Correct! 🎉",
                  description: "Moving to next question...",
                });
                setCurrentQuestionIndex(prev => prev + 1);
              } else {
                toast({
                  title: "Incorrect ❌",
                  description: "Try again!",
                  variant: "destructive",
                });
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
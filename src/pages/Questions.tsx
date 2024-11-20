import { useState } from "react";
import { questions } from "@/data/questions";
import { useToast } from "@/components/ui/use-toast";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { toast } = useToast();
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p>Thank you for participating.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="text-white/70">Time remaining: {currentQuestion.timeLimit}s</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl text-white mb-4">{currentQuestion.text}</h3>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-4 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={() => {
                  if (option === currentQuestion.correctAnswer) {
                    toast({
                      title: "Correct!",
                      description: "Moving to next question...",
                    });
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    toast({
                      title: "Incorrect",
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
      </div>
    </div>
  );
};

export default Questions;
import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { ScoreDisplay } from "@/components/quiz/ScoreDisplay";
import { QuestionCard } from "@/components/quiz/QuestionCard";

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
    return <ScoreDisplay score={score} questions={questions} />;
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
        <QuestionCard
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          timeLeft={timeLeft}
          handleAnswer={handleAnswer}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default Questions;
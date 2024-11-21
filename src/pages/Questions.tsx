import { questions } from "@/data/questions";
import { ScoreDisplay } from "@/components/quiz/ScoreDisplay";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScoresStore } from "@/store/scoresStore";
import { useInviteCodeStore } from "@/store/inviteCodeStore";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();
  const { addScore } = useScoresStore();
  const { currentCode } = useInviteCodeStore();
  
  const currentQuestion = questions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setShowScore(true);
      // Save score to store
      if (currentCode) {
        addScore({
          username: currentCode.username,
          participantName: currentCode.participantName,
          score,
          outOf: questions.length
        });
      }
      // Redirect to scores page after showing the score for 5 seconds
      const timer = setTimeout(() => {
        navigate("/scores");
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, currentQuestion, navigate, score, addScore, currentCode]);

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
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { ScoreDisplay } from "@/components/quiz/ScoreDisplay";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useNavigate } from "react-router-dom";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { useScoresStore } from "@/store/scoresStore";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([...questions]);
  const navigate = useNavigate();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];
  const { currentCode } = useInviteCodeStore();
  const { addScore } = useScoresStore();

  const shuffleQuestions = () => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    toast.success("Questions shuffled! Starting new game...");
  };

  useEffect(() => {
    if (currentQuestionIndex >= shuffledQuestions.length) {
      setShowScore(true);
      if (currentCode) {
        addScore({
          username: currentCode.username,
          participantName: currentCode.participantName,
          score,
          correctAnswers: Math.round(score / 1000),
          totalQuestions: shuffledQuestions.length
        });
      }
      const timer = setTimeout(() => {
        navigate("/scores");
      }, 5000);
      return () => clearTimeout(timer);
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
  }, [currentQuestionIndex, currentQuestion, navigate, score, currentCode, addScore, shuffledQuestions]);

  if (showScore) {
    return <ScoreDisplay score={score} questions={shuffledQuestions} />;
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
        <div className="mb-4 flex justify-end">
          <Button
            variant="outline"
            onClick={shuffleQuestions}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle Questions
          </Button>
        </div>
        <QuestionCard
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={shuffledQuestions.length}
          timeLeft={timeLeft}
          handleAnswer={handleAnswer}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default Questions;
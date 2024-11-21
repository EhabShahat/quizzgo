import { useState, useEffect } from "react";
import { questions as initialQuestions } from "@/data/questions";
import { ScoreDisplay } from "@/components/quiz/ScoreDisplay";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useNavigate } from "react-router-dom";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { useScoresStore } from "@/store/scoresStore";
import { useQuizStore } from "@/store/quizStore";
import type { Question } from "@/types/database";

const Questions = () => {
  const navigate = useNavigate();
  const { currentCode } = useInviteCodeStore();
  const { addScore } = useScoresStore();
  const { shuffleQuestions } = useQuizStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  useEffect(() => {
    const convertedQuestions: Question[] = initialQuestions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options,
      correct_answer: q.correctAnswer,
      time_limit: q.timeLimit,
      type: q.type,
      created_at: new Date().toISOString()
    }));

    if (shuffleQuestions) {
      setQuestions([...convertedQuestions].sort(() => Math.random() - 0.5));
    } else {
      setQuestions(convertedQuestions);
    }
  }, [shuffleQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setShowScore(true);
      // Save score to store
      if (currentCode) {
        addScore({
          username: currentCode.username,
          participant_name: currentCode.participant_name,
          score,
          correct_answers: Math.round((score / 1000)), // Approximate based on score
          total_questions: questions.length
        });
      }
      // Redirect to scores page after showing the score for 5 seconds
      const timer = setTimeout(() => {
        navigate("/scores");
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    if (!currentQuestion) return;
    
    const questionTimeLimit = currentQuestion.time_limit;
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
  }, [currentQuestionIndex, currentQuestion, navigate, score, currentCode, addScore, questions.length]);

  if (showScore) {
    return <ScoreDisplay score={score} questions={questions} />;
  }

  if (!currentQuestion) {
    return null;
  }

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / currentQuestion.time_limit) * 1000);
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

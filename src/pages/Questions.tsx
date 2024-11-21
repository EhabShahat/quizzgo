import { useState, useEffect } from "react";
import { ScoreDisplay } from "@/components/quiz/ScoreDisplay";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useNavigate } from "react-router-dom";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { useScoresStore } from "@/store/scoresStore";
import { useQuizStore } from "@/store/quizStore";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Questions = () => {
  const navigate = useNavigate();
  const { currentCode } = useInviteCodeStore();
  const { addScore } = useScoresStore();
  const { shuffleQuestions } = useQuizStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const colors = ["#E21B3C", "#1368CE", "#D89E00", "#26890C"];

  // Fetch questions from Supabase
  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*');
      
      if (error) throw error;
      
      if (shuffleQuestions && data) {
        return [...data].sort(() => Math.random() - 0.5);
      }
      return data || [];
    }
  });

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      setShowScore(true);
      if (currentCode) {
        addScore({
          username: currentCode.username,
          participant_name: currentCode.participant_name,
          score,
          correct_answers: correctAnswers,
          total_questions: questions.length
        });
      }
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
  }, [currentQuestionIndex, currentQuestion, score, currentCode, addScore, questions.length, correctAnswers]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center">
        <div className="text-white text-2xl">Loading questions...</div>
      </div>
    );
  }

  if (showScore) {
    return <ScoreDisplay 
      score={score} 
      questions={questions} 
      correctAnswers={correctAnswers} 
      totalQuestions={questions.length}
    />;
  }

  if (!currentQuestion) {
    return null;
  }

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / currentQuestion.time_limit) * 1000);
      setScore(prev => prev + timeBonus);
      setCorrectAnswers(prev => prev + 1);
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
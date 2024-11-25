import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { questions as initialQuestions, Question } from "@/data/questions";
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionList from "@/components/admin/QuestionList";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Controls } from "@/components/admin/Controls";
import InviteCodes from "@/components/admin/InviteCodes";
import ScoresList from "@/components/admin/scores/ScoresList";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const queryClient = useQueryClient();
  const { fetchCodes } = useInviteCodeStore();

  // Fetch quiz settings
  const { data: quizSettings } = useQuery({
    queryKey: ['quiz-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch questions
  const { data: fetchedQuestions } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  // Update local state when questions are fetched
  useEffect(() => {
    if (fetchedQuestions) {
      const mappedQuestions: Question[] = fetchedQuestions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correct_answer: q.correct_answer,
        timeLimit: q.time_limit,
        type: q.type as 'multiple-choice' | 'true-false'
      }));
      setQuestions(mappedQuestions);
    }
  }, [fetchedQuestions]);

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const handleTabChange = async (value: string) => {
    if (value === 'invites') {
      try {
        await fetchCodes();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to refresh invite codes",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddQuestion = (question: Omit<Question, "id">) => {
    const newQuestion = {
      ...question,
      id: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
    queryClient.invalidateQueries({ queryKey: ['questions'] });
    toast({
      title: "Question added",
      description: "The question has been added successfully",
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    queryClient.invalidateQueries({ queryKey: ['questions'] });
    toast({
      title: "Question deleted",
      description: "The question has been deleted successfully",
    });
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleUpdateQuestion = (updatedQuestion: Omit<Question, "id">) => {
    if (editingQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.id === editingQuestion.id ? { ...updatedQuestion, id: q.id } : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      toast({
        title: "Question updated",
        description: "The question has been updated successfully",
      });
    }
  };

  const handleQuestionsUpdate = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    queryClient.invalidateQueries({ queryKey: ['questions'] });
  };

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          queryClient.prefetchQuery({ queryKey: ['quiz-settings'] }),
          queryClient.prefetchQuery({ queryKey: ['questions'] }),
          queryClient.prefetchQuery({ queryKey: ['scores'] }),
          fetchCodes()
        ]);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Some data could not be loaded. Please try refreshing.",
          variant: "destructive",
        });
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] px-2 sm:px-4 py-4 flex flex-col">
      <div className="w-full max-w-[95vw] sm:max-w-3xl mx-auto flex-grow">
        <AdminHeader onLogout={handleLogout} />

        <Tabs defaultValue="questions" className="space-y-4" onValueChange={handleTabChange}>
          <AdminTabs />

          <TabsContent value="questions" className="space-y-4">
            <QuestionForm
              onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
              editingQuestion={editingQuestion}
              onCancelEdit={() => setEditingQuestion(null)}
            />
            <QuestionList
              questions={questions}
              onEdit={handleEditQuestion}
              onQuestionsUpdate={handleQuestionsUpdate}
            />
          </TabsContent>

          <TabsContent value="controls">
            <Controls />
          </TabsContent>

          <TabsContent value="invites">
            <InviteCodes />
          </TabsContent>

          <TabsContent value="scores">
            <ScoresList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;

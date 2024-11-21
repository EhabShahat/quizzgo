import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionList from "@/components/admin/QuestionList";
import InviteCodes from "@/components/admin/InviteCodes";
import Controls from "@/components/admin/Controls";
import { useQuizStore } from "@/store/quizStore";
import { useToast } from "@/components/ui/use-toast";
import type { Question } from "@/data/questions";

const AdminPanel = () => {
  const { toast } = useToast();
  const { fetchQuestions, addQuestion, updateQuestion, deleteQuestion } = useQuizStore();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load questions",
        variant: "destructive",
      });
    }
  };

  const handleAddQuestion = async (question: Omit<Question, 'id'>) => {
    try {
      await addQuestion(question);
      await loadQuestions();
      toast({
        title: "Success",
        description: "Question added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuestion = async (id: number, question: Partial<Question>) => {
    try {
      await updateQuestion(id, question);
      await loadQuestions();
      toast({
        title: "Success",
        description: "Question updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    try {
      await deleteQuestion(id);
      await loadQuestions();
      toast({
        title: "Success",
        description: "Question deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Controls />
        
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="questions" className="data-[state=active]:bg-white/10">
              Questions
            </TabsTrigger>
            <TabsTrigger value="invite-codes" className="data-[state=active]:bg-white/10">
              Invite Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <QuestionForm onSubmit={handleAddQuestion} />
            <QuestionList
              questions={questions}
              onDelete={handleDeleteQuestion}
              onEdit={(question) => handleUpdateQuestion(question.id, question)}
            />
          </TabsContent>

          <TabsContent value="invite-codes">
            <InviteCodes />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;

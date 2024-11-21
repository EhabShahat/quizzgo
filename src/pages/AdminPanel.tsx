import { Book, Timer, Key, LogOut, Trophy, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { questions as initialQuestions, Question } from "@/data/questions";
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionList from "@/components/admin/QuestionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controls } from "@/components/admin/Controls";
import InviteCodes from "@/components/admin/InviteCodes";
import ScoresList from "@/components/admin/scores/ScoresList";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useInviteCodeStore } from "@/store/inviteCodeStore";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const queryClient = useQueryClient();
  const { fetchCodes } = useInviteCodeStore();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const handleRefreshData = async () => {
    try {
      await queryClient.refetchQueries();
      toast({
        title: "Data refreshed",
        description: "All data has been refreshed from the database",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = async (value: string) => {
    if (value === 'invites') {
      try {
        await fetchCodes();
        toast({
          title: "Success",
          description: "Invite codes refreshed successfully",
        });
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
    toast({
      title: "Question added",
      description: "The question has been added successfully",
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
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
      toast({
        title: "Question updated",
        description: "The question has been updated successfully",
      });
    }
  };

  const handleQuestionsUpdate = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] p-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex gap-2">
            <Button
              onClick={handleRefreshData}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Data
            </Button>
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="questions" className="space-y-6" onValueChange={handleTabChange}>
          <div className="max-w-4xl mx-auto">
            <TabsList className="bg-white/5 border-b border-white/10 w-full justify-between rounded-none p-0">
              <TabsTrigger
                value="questions"
                className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-4 py-2"
              >
                <Book className="w-4 h-4 mr-2" />
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="controls"
                className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-4 py-2"
              >
                <Timer className="w-4 h-4 mr-2" />
                Controls
              </TabsTrigger>
              <TabsTrigger
                value="invites"
                className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-4 py-2"
              >
                <Key className="w-4 h-4 mr-2" />
                Invites
              </TabsTrigger>
              <TabsTrigger
                value="scores"
                className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-4 py-2"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Scores
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="questions" className="space-y-6">
            <QuestionForm
              onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
              editingQuestion={editingQuestion}
              onCancelEdit={() => setEditingQuestion(null)}
            />
            <QuestionList
              questions={questions}
              onDelete={handleDeleteQuestion}
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

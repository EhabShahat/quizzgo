import { Book, Timer, Key, LogOut, Trophy } from "lucide-react";
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

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-black/20 border-b border-white/10 w-full justify-start rounded-t-2xl p-1 gap-2">
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl border-none px-6 py-3 transition-all duration-300"
            >
              <Book className="w-5 h-5 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="controls"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl border-none px-6 py-3 transition-all duration-300"
            >
              <Timer className="w-5 h-5 mr-2" />
              Controls
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl border-none px-6 py-3 transition-all duration-300"
            >
              <Key className="w-5 h-5 mr-2" />
              Invites
            </TabsTrigger>
            <TabsTrigger
              value="scores"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl border-none px-6 py-3 transition-all duration-300"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Scores
            </TabsTrigger>
          </TabsList>

          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <TabsContent value="questions" className="space-y-6 animate-fadeIn">
              <QuestionForm
                onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                editingQuestion={editingQuestion}
                onCancelEdit={() => setEditingQuestion(null)}
              />
              <QuestionList
                questions={questions}
                onDelete={handleDeleteQuestion}
                onEdit={handleEditQuestion}
              />
            </TabsContent>

            <TabsContent value="controls" className="animate-fadeIn">
              <Controls />
            </TabsContent>

            <TabsContent value="invites" className="animate-fadeIn">
              <InviteCodes />
            </TabsContent>

            <TabsContent value="scores" className="animate-fadeIn">
              <ScoresList />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
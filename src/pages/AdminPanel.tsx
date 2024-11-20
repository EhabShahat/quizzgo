import { useState } from "react";
import { Book, Timer, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { questions as initialQuestions, Question } from "@/data/questions";
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionList from "@/components/admin/QuestionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPanel = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const handleAddQuestion = (newQuestion: Omit<Question, "id">) => {
    const id = Math.max(...questions.map((q) => q.id), 0) + 1;
    setQuestions([...questions, { ...newQuestion, id }]);
    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Success",
      description: "Question deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start rounded-none p-0">
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-6 py-3"
            >
              <Book className="w-5 h-5 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="timer"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-6 py-3"
            >
              <Timer className="w-5 h-5 mr-2" />
              Timer Settings
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-6 py-3"
            >
              <Key className="w-5 h-5 mr-2" />
              Invite Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <QuestionForm onSubmit={handleAddQuestion} />
            <QuestionList questions={questions} onDelete={handleDeleteQuestion} />
          </TabsContent>

          <TabsContent value="timer">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
              <p className="text-white/70">Coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="invites">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold text-white">Invite Codes</h2>
              <p className="text-white/70">Coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
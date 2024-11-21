import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStart = () => {
    navigate("/questions");
    toast({
      title: "Quiz Started",
      description: "Good luck!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-md space-y-6">
        <img 
          src="/main-logo.png" 
          alt="Quiz Logo" 
          className="w-48 h-48 mx-auto rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold text-white text-center">QuizWhiz</h1>
        <p className="text-white/80 text-center">
          Test your knowledge with our interactive quiz!
        </p>
        <Button onClick={handleStart} className="w-full">
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default Index;
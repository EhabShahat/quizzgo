import { useState } from "react";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invite code",
        variant: "destructive",
      });
      return;
    }

    if (inviteCode.trim() === "qwe123") {
      toast({
        title: "Success",
        description: "Welcome to the quiz!",
      });
      navigate("/questions");
    } else {
      toast({
        title: "Error",
        description: "Invalid invite code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-8 w-full max-w-md mx-auto animate-scaleIn">
      <Shield className="w-12 h-12 mx-auto mb-6 text-white/80 animate-float" />
      <h1 className="text-3xl font-bold text-white text-center mb-2 animate-fadeIn">
        Quiz Challenge
      </h1>
      <p className="text-white/70 text-center mb-8 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
        Enter your invite code to begin
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter your invite code"
            className="input-styles transform transition-all duration-300 hover:scale-102 focus:scale-102"
          />
        </div>
        
        <button 
          type="submit" 
          className="button-styles animate-fadeIn transform transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ animationDelay: "0.3s" }}
        >
          Start Quiz
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <button 
        className="mt-8 text-white/50 text-sm flex items-center gap-2 mx-auto hover:text-white transition-colors animate-fadeIn"
        style={{ animationDelay: "0.4s" }}
        onClick={() => toast({
          title: "Admin Access",
          description: "Please contact your administrator for access.",
        })}
      >
        <Lock className="w-4 h-4" />
        Admin Access
      </button>
    </div>
  );
};

export default InviteCodeForm;
import { useState } from "react";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
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
      navigate("/questions");
    } else {
      toast({
        title: "Error",
        description: "Invalid invite code",
        variant: "destructive",
      });
    }
  };

  const handleAdminAccess = () => {
    if (!showAdminInput) {
      setShowAdminInput(true);
      return;
    }

    if (adminPassword === "admin123") {
      navigate("/admin");
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
    setAdminPassword("");
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

      <div className="mt-8 flex flex-col items-center gap-4">
        {showAdminInput && (
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className="max-w-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
            autoFocus
          />
        )}
        <button 
          className="text-white/50 text-sm flex items-center gap-2 hover:text-white transition-colors animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
          onClick={handleAdminAccess}
        >
          <Lock className="w-4 h-4" />
          Admin Access
        </button>
      </div>
    </div>
  );
};

export default InviteCodeForm;
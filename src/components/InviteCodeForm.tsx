import { useState } from "react";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const { toast } = useToast();

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
    // Handle invite code submission
    toast({
      title: "Success",
      description: "Invite code accepted",
    });
  };

  return (
    <div className="glass-card p-8 w-full max-w-md mx-auto animate-fadeIn">
      <Shield className="w-12 h-12 mx-auto mb-6 text-white/80" />
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Quiz Challenge
      </h1>
      <p className="text-white/70 text-center mb-8">
        Enter your invite code to begin
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter your invite code"
            className="input-styles"
          />
        </div>
        
        <button type="submit" className="button-styles">
          Start Quiz
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <button 
        className="mt-8 text-white/50 text-sm flex items-center gap-2 mx-auto hover:text-white transition-colors"
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
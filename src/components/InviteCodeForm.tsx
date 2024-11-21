import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useInviteCodeStore } from "@/store/inviteCodeStore";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getInviteCodeDetails, markCodeAsUsed, setCurrentCode } = useInviteCodeStore();

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

    const codeDetails = getInviteCodeDetails(inviteCode.trim());
    
    if (!codeDetails) {
      toast({
        title: "Error",
        description: "Invalid invite code",
        variant: "destructive",
      });
      return;
    }

    if (codeDetails.used) {
      // If code is already used, redirect directly to scores page
      navigate("/scores");
      toast({
        title: "Info",
        description: "This code has already been used. Redirecting to scores...",
      });
      return;
    }

    // Valid and unused code
    markCodeAsUsed(inviteCode.trim());
    setCurrentCode(codeDetails);
    navigate(`/welcome/${encodeURIComponent(codeDetails.username || "Guest")}`);
    toast({
      title: "Success",
      description: "Welcome to the quiz!",
    });
  };

  const handleAdminAccess = () => {
    if (!showAdminInput) {
      setShowAdminInput(true);
      return;
    }

    if (adminPassword === "admin123") {
      navigate("/admin");
      toast({
        title: "Success",
        description: "Welcome to admin panel",
      });
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
    <div className="w-full max-w-sm space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter your invite code"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300"
        >
          Join Quiz
        </button>
      </form>

      <div className="flex flex-col items-center gap-4">
        {showAdminInput && (
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        )}
        <button
          className="text-white/50 text-sm flex items-center gap-2 hover:text-white transition-colors"
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
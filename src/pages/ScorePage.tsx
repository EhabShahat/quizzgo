import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import ScoresList from "@/components/admin/scores/ScoresList";

const ScorePage = () => {
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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
    <div className="relative">
      <ScoresList />
      
      {/* Admin Access Section */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-4 z-50">
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
          className="text-white/50 text-sm flex items-center gap-2 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-lg"
          onClick={handleAdminAccess}
        >
          <Lock className="w-4 h-4" />
          Admin Access
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
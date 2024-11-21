import { useState, useEffect } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useQuizStore } from "@/store/quizStore";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { format } from "date-fns";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [mainTitle, setMainTitle] = useState("Quiz Challenge");
  const [logoUrl, setLogoUrl] = useState("/lovable-uploads/93d9dacf-3f86-4876-8e06-1fe8ff282f71.png");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isEnabled, startTime, endTime } = useQuizStore();
  const { isValidCode, markCodeAsUsed, getInviteCodeDetails } = useInviteCodeStore();

  useEffect(() => {
    const storedTitle = localStorage.getItem('mainTitle');
    const storedLogoUrl = localStorage.getItem('logoUrl');
    if (storedTitle) setMainTitle(storedTitle);
    if (storedLogoUrl) setLogoUrl(storedLogoUrl);
  }, []);

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

    if (isValidCode(inviteCode.trim())) {
      const codeDetails = getInviteCodeDetails(inviteCode.trim());
      markCodeAsUsed(inviteCode.trim());
      navigate(`/welcome/${encodeURIComponent(codeDetails?.username || "Guest")}`);
      toast({
        title: "Success",
        description: "Welcome to the quiz!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid or already used invite code",
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
    <div className="glass-card p-8 w-full max-w-md mx-auto">
      <img 
        src={logoUrl}
        alt="Church Logo" 
        className="w-40 h-40 mx-auto mb-6 rounded-full shadow-lg"
      />
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        {mainTitle}
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
            disabled={!isEnabled}
          />
          {!isEnabled && startTime && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-red-300/30">
              <p className="text-xl font-semibold text-white text-center">
                Quiz Schedule
              </p>
              <p className="text-lg text-white/90 text-center mt-2">
                From: {format(startTime, "PPP 'at' p")}
                {endTime && (
                  <>
                    <br />
                    To: {format(endTime, "PPP 'at' p")}
                  </>
                )}
              </p>
            </div>
          )}
          {!isEnabled && !startTime && (
            <div className="mt-4 p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-red-300/30">
              <p className="text-3xl font-bold text-white text-center">
                We will open soon...
              </p>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="button-styles"
          disabled={!isEnabled}
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
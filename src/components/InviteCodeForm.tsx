import { useState, useEffect } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useQuizStore } from "@/store/quizStore";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const InviteCodeForm = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [mainTitle, setMainTitle] = useState("QuizGo");
  const [logoUrl, setLogoUrl] = useState("/lovable-uploads/93d9dacf-3f86-4876-8e06-1fe8ff282f71.png");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isEnabled, startTime, endTime } = useQuizStore();
  const { isValidCode, markCodeAsUsed, getInviteCodeDetails } = useInviteCodeStore();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('quiz_settings')
        .select('main_title, logo_url')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        return;
      }

      if (data) {
        setMainTitle(data.main_title || "QuizGo");
        setLogoUrl(data.logo_url || "/lovable-uploads/93d9dacf-3f86-4876-8e06-1fe8ff282f71.png");
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter an invite code",
        variant: "destructive",
      });
      return;
    }

    const codeDetails = await getInviteCodeDetails(inviteCode.trim());
    
    if (!codeDetails) {
      toast({
        title: "Error",
        description: "Invalid invite code",
        variant: "destructive",
      });
      return;
    }

    if (codeDetails.used) {
      navigate("/scores");
      toast({
        title: "Info",
        description: "This code has already been used. Redirecting to scores...",
      });
      return;
    }

    await markCodeAsUsed(inviteCode.trim());
    navigate(`/welcome/${encodeURIComponent(codeDetails.participant_name || "Guest")}/${encodeURIComponent(inviteCode.trim())}`);
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
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
    setAdminPassword("");
  };

  const renderQuizStatus = () => {
    if (!isEnabled) {
      if (startTime) {
        return (
          <div className="mt-4 p-3 sm:p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-yellow-300/30">
            <p className="text-lg sm:text-xl font-semibold text-white text-center">
              Quiz Will Start Soon
            </p>
            <p className="text-sm sm:text-base text-white/90 text-center mt-2">
              Start Time: {format(startTime, "PPP 'at' p")}
              {endTime && (
                <>
                  <br />
                  End Time: {format(endTime, "PPP 'at' p")}
                </>
              )}
            </p>
          </div>
        );
      }
      return (
        <div className="mt-4 p-4 sm:p-5 bg-white/5 rounded-lg backdrop-blur-sm border border-red-300/30">
          <p className="text-xl sm:text-2xl font-bold text-white text-center">
            Quiz is currently inactive
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 sm:p-8 w-full max-w-md mx-auto">
      <img 
        src={logoUrl}
        alt="Quiz Logo" 
        className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6 rounded-full shadow-lg"
      />
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
        {mainTitle}
      </h1>
      <p className="text-sm sm:text-base text-white/70 text-center mb-6 sm:mb-8">
        Enter your invite code to begin
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Enter your invite code"
            className="input-styles"
            disabled={!isEnabled}
          />
          {renderQuizStatus()}
        </div>
        
        <button 
          type="submit" 
          className="button-styles"
          disabled={!isEnabled}
        >
          Start Quiz
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>

      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
        {showAdminInput && (
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter admin password"
            className="max-w-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/50 text-sm"
            autoFocus
          />
        )}
        <button 
          className="text-white/50 text-xs sm:text-sm flex items-center gap-2 hover:text-white transition-colors"
          onClick={handleAdminAccess}
        >
          <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
          Admin Access
        </button>
      </div>
    </div>
  );
};

export default InviteCodeForm;
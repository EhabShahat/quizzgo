import { Book, Timer, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#2d1f47] p-4">
      <div className="glass-card max-w-4xl mx-auto p-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="glass-card p-6 hover:bg-white/5 transition-colors group">
            <Book className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-white mb-2">Questions</h2>
            <p className="text-white/70">Manage quiz questions and answers</p>
          </button>

          <button className="glass-card p-6 hover:bg-white/5 transition-colors group">
            <Timer className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-white mb-2">Timer Settings</h2>
            <p className="text-white/70">Configure question time limits</p>
          </button>

          <button className="glass-card p-6 hover:bg-white/5 transition-colors group">
            <Key className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-semibold text-white mb-2">Invite Codes</h2>
            <p className="text-white/70">Generate and manage access codes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
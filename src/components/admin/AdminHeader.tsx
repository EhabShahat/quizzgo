import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Panel</h1>
      <Button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-sm sm:text-base"
      >
        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        Logout
      </Button>
    </div>
  );
};
import { Book, Timer, Key, Trophy } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminTabs = () => {
  return (
    <TabsList className="bg-white/5 border-b border-white/10 w-full justify-between rounded-none p-0">
      <TabsTrigger
        value="questions"
        className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
      >
        <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Questions</span>
        <span className="sm:hidden">Q</span>
      </TabsTrigger>
      <TabsTrigger
        value="controls"
        className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
      >
        <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Controls</span>
        <span className="sm:hidden">C</span>
      </TabsTrigger>
      <TabsTrigger
        value="invites"
        className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
      >
        <Key className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Invites</span>
        <span className="sm:hidden">I</span>
      </TabsTrigger>
      <TabsTrigger
        value="scores"
        className="flex-1 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-none border-b-2 border-transparent data-[state=active]:border-[#8B5CF6] px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
      >
        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Scores</span>
        <span className="sm:hidden">S</span>
      </TabsTrigger>
    </TabsList>
  );
};
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";

export const Controls = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { setEnabled, setStartTime } = useQuizStore();

  const handleDisable = () => {
    setEnabled(false);
    setStartTime(date || null);
    toast.success(
      date 
        ? `Quiz disabled. Will start at ${format(date, "PPP 'at' p")}`
        : "Quiz disabled. No start time set."
    );
  };

  const handleEnable = () => {
    setEnabled(true);
    setStartTime(null);
    toast.success("Quiz enabled");
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Quiz Controls</h2>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Schedule Start Time (Optional)</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-white rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleEnable}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Enable Quiz
          </Button>
          <Button 
            onClick={handleDisable}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Disable Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
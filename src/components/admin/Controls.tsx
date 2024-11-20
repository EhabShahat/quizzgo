import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { Timer, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Controls = () => {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const { isEnabled, startTime: quizStartTime, endTime: quizEndTime, setEnabled, setStartTime, setEndTime } = useQuizStore();

  const handleSaveSettings = () => {
    if (!startDateTime) {
      setEnabled(false);
      setStartTime(null);
      setEndTime(null);
      toast.success("Quiz settings saved. No start time set.");
      return;
    }

    const selectedStartTime = new Date(startDateTime);
    const selectedEndTime = endDateTime ? new Date(endDateTime) : new Date(startDateTime);

    if (selectedEndTime <= selectedStartTime) {
      toast.error("End time must be after start time");
      return;
    }

    setEnabled(false);
    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
    toast.success("Quiz settings saved successfully");
  };

  return (
    <div className="glass-card p-6 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Timer className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={setEnabled}
            className="data-[state=checked]:bg-purple-500"
          />
          <Label className="text-white">Quiz is currently active</Label>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz Start</Label>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="w-full bg-white/5 text-white border border-white/10 rounded-md p-2"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz End</Label>
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className="w-full bg-white/5 text-white border border-white/10 rounded-md p-2"
          />
        </div>

        <Button
          onClick={handleSaveSettings}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        <h3 className="text-lg font-semibold text-white">Current Status</h3>
        <p className="text-white/70">
          Start Time: {quizStartTime ? format(quizStartTime, "PPP 'at' p") : 'Not set'}
        </p>
        <p className="text-white/70">
          End Time: {quizEndTime ? format(quizEndTime, "PPP 'at' p") : 'Not set'}
        </p>
        <p className="text-white/70">
          Status: <span className={isEnabled ? "text-green-400" : "text-red-400"}>
            {isEnabled ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>
    </div>
  );
};
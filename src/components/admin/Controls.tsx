import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { Timer, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Controls = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  
  const { isEnabled, startTime: quizStartTime, endTime: quizEndTime, setEnabled, setStartTime, setEndTime } = useQuizStore();

  const handleSaveSettings = () => {
    if (!date) {
      setEnabled(false);
      setStartTime(null);
      setEndTime(null);
      toast.success("Quiz settings saved. No start time set.");
      return;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const selectedStartTime = new Date(date);
    selectedStartTime.setHours(startHour, startMinute);
    
    const selectedEndTime = endDate ? new Date(endDate) : new Date(date);
    selectedEndTime.setHours(endHour, endMinute);

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
      <div className="flex items-center gap-3 mb-6">
        <Timer className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz Start</Label>
          <div className="flex gap-4">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-32 bg-white/5 text-white"
            />
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white/5 text-white"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz End</Label>
          <div className="flex gap-4">
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-32 bg-white/5 text-white"
            />
          </div>
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            className="rounded-md border bg-white/5 text-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={setEnabled}
            className="data-[state=checked]:bg-purple-500"
          />
          <Label className="text-white">Quiz is currently active</Label>
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
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { Timer, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Controls = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("23");
  const [endMinute, setEndMinute] = useState("59");
  
  const { isEnabled, startTime, endTime, setEnabled, setStartTime, setEndTime } = useQuizStore();

  const handleSaveSettings = () => {
    if (!date) {
      setEnabled(false);
      setStartTime(null);
      setEndTime(null);
      toast.success("Quiz settings saved. No start time set.");
      return;
    }

    const selectedStartTime = new Date(date);
    selectedStartTime.setHours(parseInt(startHour), parseInt(startMinute));
    
    const selectedEndTime = endDate ? new Date(endDate) : new Date(date);
    selectedEndTime.setHours(parseInt(endHour), parseInt(endMinute));

    if (selectedEndTime <= selectedStartTime) {
      toast.error("End time must be after start time");
      return;
    }

    setEnabled(false);
    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
    toast.success("Quiz settings saved successfully");
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="glass-card p-6 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Timer className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Timer Settings</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz Start Time</Label>
          <div className="flex gap-4">
            <Select value={startHour} onValueChange={setStartHour}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={startMinute} onValueChange={setStartMinute}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white/5 text-white"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz End Time</Label>
          <div className="flex gap-4">
            <Select value={endHour} onValueChange={setEndHour}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={endMinute} onValueChange={setEndMinute}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          Start Time: {startTime ? format(startTime, "PPP 'at' p") : 'Not set'}
        </p>
        <p className="text-white/70">
          End Time: {endTime ? format(endTime, "PPP 'at' p") : 'Not set'}
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
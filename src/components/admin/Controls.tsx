import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Controls = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("23");
  const [endMinute, setEndMinute] = useState("59");
  
  const { isEnabled, startTime, endTime, setEnabled, setStartTime, setEndTime } = useQuizStore();

  const handleDisable = () => {
    if (!date) {
      setEnabled(false);
      setStartTime(null);
      setEndTime(null);
      toast.success("Quiz disabled. No start time set.");
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
    toast.success(`Quiz disabled. Will run from ${format(selectedStartTime, "PPP 'at' p")} to ${format(selectedEndTime, "PPP 'at' p")}`);
  };

  const handleEnable = () => {
    setEnabled(true);
    setStartTime(null);
    setEndTime(null);
    toast.success("Quiz enabled");
  };

  const getCurrentStatus = () => {
    if (isEnabled) return "Quiz is currently enabled";
    if (!startTime) return "Quiz is currently disabled (no scheduled start)";
    return `Quiz will run from ${format(startTime, "PPP 'at' p")} to ${endTime ? format(endTime, "PPP 'at' p") : 'unspecified time'}`;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Quiz Controls</h2>
        <p className="text-white/70">{getCurrentStatus()}</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Schedule Quiz Time</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white mb-2">Start Date & Time</h4>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-white rounded-md"
              />
              <div className="flex gap-4 mt-2">
                <div className="space-y-2">
                  <Label className="text-white">Hour</Label>
                  <Input
                    type="number"
                    min="0"
                    max="23"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value.padStart(2, '0'))}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Minute</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={startMinute}
                    onChange={(e) => setStartMinute(e.target.value.padStart(2, '0'))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-2">End Date & Time</h4>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="bg-white rounded-md"
              />
              <div className="flex gap-4 mt-2">
                <div className="space-y-2">
                  <Label className="text-white">Hour</Label>
                  <Input
                    type="number"
                    min="0"
                    max="23"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value.padStart(2, '0'))}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Minute</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={endMinute}
                    onChange={(e) => setEndMinute(e.target.value.padStart(2, '0'))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
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
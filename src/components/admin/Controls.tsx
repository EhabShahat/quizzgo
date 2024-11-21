import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useQuizStore } from "@/store/quizStore";
import { QuizStatus } from "./controls/QuizStatus";
import { QuizToggles } from "./controls/QuizToggles";
import { PasswordManagement } from "./controls/PasswordManagement";
import { MainScreenSettings } from "./controls/MainScreenSettings";
import { supabase } from "@/integrations/supabase/client";

export const Controls = () => {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const { setStartTime, setEndTime, isEnabled, shuffleQuestions } = useQuizStore();

  const handleSaveSettings = async () => {
    try {
      if (!startDateTime) {
        setStartTime(null);
        setEndTime(null);
      } else {
        const selectedStartTime = new Date(startDateTime);
        const selectedEndTime = endDateTime ? new Date(endDateTime) : new Date(startDateTime);

        if (selectedEndTime <= selectedStartTime) {
          toast.error("End time must be after start time");
          return;
        }

        setStartTime(selectedStartTime);
        setEndTime(selectedEndTime);
      }

      // Update quiz settings in Supabase
      const { error } = await supabase
        .from('quiz_settings')
        .update({
          start_time: startDateTime ? new Date(startDateTime).toISOString() : null,
          end_time: endDateTime ? new Date(endDateTime).toISOString() : null,
          is_enabled: isEnabled,
          shuffle_questions: shuffleQuestions,
        })
        .eq('id', 1);

      if (error) {
        throw error;
      }

      toast.success("Quiz settings saved successfully");
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="glass-card p-6 space-y-8">
      <QuizStatus />
      <QuizToggles />
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz Start (Optional)</Label>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="w-full bg-white/5 text-white border border-white/10 rounded-md p-2"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg text-white">Quiz End (Optional)</Label>
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

      <PasswordManagement />
      <MainScreenSettings />
    </div>
  );
};
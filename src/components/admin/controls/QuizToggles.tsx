import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuizStore } from "@/store/quizStore";
import { toast } from "sonner";
import { Shuffle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const QuizToggles = () => {
  const { isEnabled, shuffleQuestions, setEnabled, setShuffleQuestions } = useQuizStore();

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('quiz_settings_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quiz_settings',
        },
        (payload) => {
          if (payload.new.is_enabled !== isEnabled) {
            setEnabled(payload.new.is_enabled);
            toast.info(`Quiz is now ${payload.new.is_enabled ? 'active' : 'inactive'}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isEnabled, setEnabled]);

  const handleToggleActive = async (checked: boolean) => {
    try {
      const { error } = await supabase
        .from('quiz_settings')
        .update({ is_enabled: checked })
        .eq('id', 1);

      if (error) throw error;

      setEnabled(checked);
      if (checked) {
        toast.success("Quiz is now active");
      } else {
        toast.info("Quiz is now inactive");
      }
    } catch (error) {
      console.error('Error updating quiz status:', error);
      toast.error("Failed to update quiz status");
    }
  };

  return (
    <div className="flex items-center justify-center gap-8">
      <div className="flex items-center space-x-2">
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggleActive}
          className="data-[state=checked]:bg-purple-500"
        />
        <Label className="text-white">Active</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={shuffleQuestions}
          onCheckedChange={(checked) => {
            setShuffleQuestions(checked);
            if (checked) {
              toast.success("Questions will be shuffled when quiz starts");
            } else {
              toast.info("Questions will appear in original order");
            }
          }}
          className="data-[state=checked]:bg-purple-500"
        />
        <div className="flex items-center gap-2">
          <Shuffle className="w-4 h-4 text-white" />
          <Label className="text-white">Shuffle Questions</Label>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { setSoundEnabled, isSoundEnabled } from "@/utils/audio";

export const SoundSettings = () => {
  const [soundEnabled, setSoundEnabledState] = useState(isSoundEnabled());

  // Fetch sound settings from Supabase on component mount
  useEffect(() => {
    const fetchSoundSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_settings')
          .select('sound_enabled')
          .single();
        
        if (error) throw error;
        
        // If we have a value from the database, use it
        if (data && data.sound_enabled !== null) {
          setSoundEnabledState(data.sound_enabled);
          setSoundEnabled(data.sound_enabled);
        }
      } catch (error) {
        console.error('Error fetching sound settings:', error);
      }
    };

    fetchSoundSettings();
  }, []);

  const handleToggleSound = async (checked: boolean) => {
    try {
      // Update local state
      setSoundEnabledState(checked);
      
      // Update localStorage
      setSoundEnabled(checked);
      
      // Update database
      const { error } = await supabase
        .from('quiz_settings')
        .update({ sound_enabled: checked })
        .eq('id', 1);

      if (error) throw error;

      toast.success(`Sound effects ${checked ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating sound settings:', error);
      toast.error("Failed to update sound settings");
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white">Sound Settings</h3>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={soundEnabled}
          onCheckedChange={handleToggleSound}
          className="data-[state=checked]:bg-purple-500"
        />
        <div className="flex items-center gap-2">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-white" />
          ) : (
            <VolumeX className="w-4 h-4 text-white" />
          )}
          <Label className="text-white">Sound Effects</Label>
        </div>
      </div>
      
      <p className="text-white/70 text-sm">
        {soundEnabled 
          ? "Kahoot-inspired sound effects enabled at 80% volume" 
          : "Sound effects are currently disabled"}
      </p>
    </div>
  );
};

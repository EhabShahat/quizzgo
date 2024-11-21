import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const MainScreenSettings = () => {
  const [mainTitle, setMainTitle] = useState("Quiz Challenge");
  const [logoUrl, setLogoUrl] = useState("/lovable-uploads/93d9dacf-3f86-4876-8e06-1fe8ff282f71.png");

  const handleMainScreenUpdate = async () => {
    try {
      // Update localStorage
      localStorage.setItem('mainTitle', mainTitle);
      localStorage.setItem('logoUrl', logoUrl);

      // Update Supabase
      const { error } = await supabase
        .from('quiz_settings')
        .update({
          main_title: mainTitle,
          logo_url: logoUrl,
        })
        .eq('id', 1);

      if (error) {
        throw error;
      }

      toast.success("Main screen settings updated successfully");
    } catch (error) {
      console.error('Error updating main screen settings:', error);
      toast.error("Failed to update main screen settings");
    }
  };

  return (
    <div className="border-t border-white/10 pt-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Image className="w-5 h-5 mr-2" />
          Main Screen Settings
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Main Title</Label>
            <Input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="bg-white/5 text-white border-white/10"
              placeholder="Enter main title"
            />
          </div>
          <div>
            <Label className="text-white">Logo URL</Label>
            <Input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="bg-white/5 text-white border-white/10"
              placeholder="Enter logo URL"
            />
          </div>
          <Button
            onClick={handleMainScreenUpdate}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Update Main Screen
          </Button>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const PasswordManagement = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      // First verify current password
      const { data, error: fetchError } = await supabase
        .from('quiz_settings')
        .select('admin_password')
        .eq('id', 1)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (data.admin_password !== currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }

      // Update password in Supabase
      const { error: updateError } = await supabase
        .from('quiz_settings')
        .update({ admin_password: newPassword })
        .eq('id', 1);

      if (updateError) {
        throw updateError;
      }

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="border-t border-white/10 pt-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Change Admin Password
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-white/5 text-white border-white/10"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <Label className="text-white">New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white/5 text-white border-white/10"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label className="text-white">Confirm New Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/5 text-white border-white/10"
              placeholder="Confirm new password"
            />
          </div>
          <Button
            onClick={handlePasswordChange}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-lg"
          >
            <Lock className="w-5 h-5 mr-2" />
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};
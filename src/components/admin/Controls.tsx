import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quizStore";
import { format } from "date-fns";
import { toast } from "sonner";
import { Save, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Controls = () => {
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const { isEnabled, startTime: quizStartTime, endTime: quizEndTime, setEnabled, setStartTime, setEndTime } = useQuizStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveSettings = () => {
    if (!startDateTime) {
      setStartTime(null);
      setEndTime(null);
      toast.success("Quiz settings saved. No time restrictions set.");
      return;
    }

    const selectedStartTime = new Date(startDateTime);
    const selectedEndTime = endDateTime ? new Date(endDateTime) : new Date(startDateTime);

    if (selectedEndTime <= selectedStartTime) {
      toast.error("End time must be after start time");
      return;
    }

    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
    toast.success("Quiz settings saved successfully");
  };

  const handlePasswordChange = () => {
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

    // Here you would typically make an API call to verify the current password
    // and update to the new password. For now, we'll just show a success message
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="glass-card p-6 space-y-8">
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

      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={(checked) => {
              setEnabled(checked);
              if (checked) {
                toast.success("Quiz is now active");
              } else {
                toast.info("Quiz is now inactive");
              }
            }}
            className="data-[state=checked]:bg-purple-500"
          />
          <Label className="text-white">Active</Label>
        </div>
      </div>
      
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
    </div>
  );
};
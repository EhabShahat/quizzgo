import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuizStore } from "@/store/quizStore";
import { toast } from "sonner";
import { Shuffle } from "lucide-react";

export const QuizToggles = () => {
  const { isEnabled, shuffleQuestions, setEnabled, setShuffleQuestions } = useQuizStore();

  return (
    <div className="flex items-center justify-center gap-8">
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
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeLimitControlProps {
  timeLimit: number;
  onTimeLimitChange: (value: number) => void;
}

const TimeLimitControl = ({ timeLimit, onTimeLimitChange }: TimeLimitControlProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onTimeLimitChange(value);
    }
  };

  const incrementTimeLimit = () => onTimeLimitChange(timeLimit + 1);
  const decrementTimeLimit = () => onTimeLimitChange(timeLimit > 1 ? timeLimit - 1 : 1);

  return (
    <div className="space-y-2">
      <Label htmlFor="timeLimit" className="text-white">Time Limit (seconds)</Label>
      <div className="flex items-center gap-2">
        <Input
          id="timeLimit"
          type="number"
          min={1}
          value={timeLimit}
          onChange={handleInputChange}
          className="bg-white/5 border-white/10 text-white w-24"
          required
        />
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={incrementTimeLimit}
            className="p-1 hover:bg-white/10 rounded"
          >
            <ChevronUp className="w-4 h-4 text-white" />
          </button>
          <button
            type="button"
            onClick={decrementTimeLimit}
            className="p-1 hover:bg-white/10 rounded"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeLimitControl;
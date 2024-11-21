import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MultipleChoiceSectionProps {
  options: string[];
  correctAnswer: string;
  onOptionChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (value: string) => void;
}

const MultipleChoiceSection = ({
  options,
  correctAnswer,
  onOptionChange,
  onCorrectAnswerChange,
}: MultipleChoiceSectionProps) => {
  return (
    <RadioGroup value={correctAnswer} onValueChange={onCorrectAnswerChange}>
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor={`option${index + 1}`} className="text-white">
              Option {index + 1}
            </Label>
            <Input
              id={`option${index + 1}`}
              value={option}
              onChange={(e) => onOptionChange(index, e.target.value)}
              placeholder={`Enter option ${index + 1}`}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              required
            />
          </div>
          <RadioGroupItem
            value={index.toString()}
            id={`radio${index}`}
            className="mt-6 border-white/50 text-white"
          />
        </div>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoiceSection;
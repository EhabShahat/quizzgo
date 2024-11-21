import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TrueFalseSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const TrueFalseSection = ({ value, onChange }: TrueFalseSectionProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="mt-4">
      <div className="flex items-center space-x-4">
        <RadioGroupItem value="True" id="true" className="border-white/50 text-white" />
        <Label htmlFor="true" className="text-white">True</Label>
      </div>
      <div className="flex items-center space-x-4">
        <RadioGroupItem value="False" id="false" className="border-white/50 text-white" />
        <Label htmlFor="false" className="text-white">False</Label>
      </div>
    </RadioGroup>
  );
};

export default TrueFalseSection;
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface QuestionFormProps {
  onSubmit: (question: {
    text: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  }) => void;
}

const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      text: questionText,
      options: options,
      correctAnswer: options[parseInt(correctAnswer)],
      timeLimit: 10,
    });
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Add New Question</h2>
      
      <div className="space-y-2">
        <Label htmlFor="question" className="text-white">Question</Label>
        <Input
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          required
        />
      </div>

      <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`option${index + 1}`} className="text-white">
                Option {index + 1}
              </Label>
              <Input
                id={`option${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
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

      <button
        type="submit"
        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;
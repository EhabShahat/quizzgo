import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuestionFormProps {
  onSubmit: (question: {
    text: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
    type: 'multiple-choice' | 'true-false';
  }) => void;
}

const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");
  const [questionType, setQuestionType] = useState<'multiple-choice' | 'true-false'>('multiple-choice');
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("True");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (questionType === 'true-false') {
      onSubmit({
        text: questionText,
        options: ["True", "False"],
        correctAnswer: trueFalseAnswer,
        timeLimit: 10,
        type: 'true-false'
      });
    } else {
      onSubmit({
        text: questionText,
        options: options,
        correctAnswer: options[parseInt(correctAnswer)],
        timeLimit: 10,
        type: 'multiple-choice'
      });
    }

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    setTrueFalseAnswer("True");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Add New Question</h2>
      
      <Tabs defaultValue="multiple-choice" onValueChange={(value) => setQuestionType(value as 'multiple-choice' | 'true-false')}>
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="multiple-choice" className="data-[state=active]:bg-white/10">
            Multiple Choice
          </TabsTrigger>
          <TabsTrigger value="true-false" className="data-[state=active]:bg-white/10">
            True/False
          </TabsTrigger>
        </TabsList>

        <div className="space-y-2 mt-4">
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

        <TabsContent value="multiple-choice">
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
        </TabsContent>

        <TabsContent value="true-false">
          <RadioGroup value={trueFalseAnswer} onValueChange={setTrueFalseAnswer} className="mt-4">
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="True" id="true" className="border-white/50 text-white" />
              <Label htmlFor="true" className="text-white">True</Label>
            </div>
            <div className="flex items-center space-x-4">
              <RadioGroupItem value="False" id="false" className="border-white/50 text-white" />
              <Label htmlFor="false" className="text-white">False</Label>
            </div>
          </RadioGroup>
        </TabsContent>
      </Tabs>

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
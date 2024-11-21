import { format } from "date-fns";
import { useQuizStore } from "@/store/quizStore";

export const QuizStatus = () => {
  const { isEnabled, startTime: quizStartTime, endTime: quizEndTime } = useQuizStore();

  return (
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
  );
};
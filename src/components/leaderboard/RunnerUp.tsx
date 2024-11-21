interface RunnerUpProps {
  rank: number;
  name: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const RunnerUp = ({ rank, name, score, correctAnswers, totalQuestions }: RunnerUpProps) => {
  return (
    <div className="bg-[#3C1278]/30 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 hover:bg-[#3C1278]/50 transition-all duration-300">
      <div className="w-10 h-10 rounded-full bg-[#3C1278] flex items-center justify-center text-white font-bold">
        {rank}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">{name}</h3>
          <span className="text-white/60 text-sm">{score}</span>
        </div>
        <div className="text-sm text-white/60">
          {correctAnswers} out of {totalQuestions}
        </div>
      </div>
    </div>
  );
};
interface RunnerUpProps {
  rank: number;
  name: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const RunnerUp = ({ rank, name, score, correctAnswers, totalQuestions }: RunnerUpProps) => {
  return (
    <div className="bg-[#3C1278]/30 backdrop-blur-sm rounded-xl p-6 flex items-center gap-6 hover:bg-[#3C1278]/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-[#3C1278] flex items-center justify-center text-white font-bold text-lg">
        {rank}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <span className="text-white text-lg font-medium">{score}</span>
        </div>
        <div className="text-base text-white/80 mt-1 font-medium">
          {correctAnswers} out of {totalQuestions}
        </div>
      </div>
    </div>
  );
};
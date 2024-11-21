import { PodiumBadge } from "./PodiumBadge";

interface PodiumStandProps {
  rank: number;
  name: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const PodiumStand = ({ rank, name, score, correctAnswers, totalQuestions }: PodiumStandProps) => {
  const getBadgeColor = () => {
    switch (rank) {
      case 1:
        return "bg-yellow-400";
      case 2:
        return "bg-gray-400";
      case 3:
        return "bg-bronze-400";
      default:
        return "bg-purple-500";
    }
  };

  const getHeight = () => {
    switch (rank) {
      case 1:
        return "h-40";
      case 2:
        return "h-32";
      case 3:
        return "h-24";
      default:
        return "h-16";
    }
  };

  return (
    <div className="flex flex-col items-center justify-end">
      <div className="flex flex-col items-center gap-4 mb-4">
        <PodiumBadge rank={rank} color={getBadgeColor()} />
        <div className="text-center">
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <p className="text-white/80 text-sm">{score} points</p>
          <p className="text-white/60 text-xs">
            {correctAnswers}/{totalQuestions} correct
          </p>
        </div>
      </div>
      <div className={`${getHeight()} w-24 bg-white/20 rounded-t-lg backdrop-blur-sm`} />
    </div>
  );
};
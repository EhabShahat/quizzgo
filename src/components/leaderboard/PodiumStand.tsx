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
        return "bg-[#FFD700]"; // Gold
      case 2:
        return "bg-[#C0C0C0]"; // Silver
      case 3:
        return "bg-[#CD7F32]"; // Bronze
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
    <div className="flex flex-col items-center justify-end group">
      <div className="flex flex-col items-center gap-4 mb-4 transform transition-transform duration-300 group-hover:scale-105">
        <div className="bg-[#3C1278]/80 p-6 rounded-xl backdrop-blur-sm">
          <PodiumBadge rank={rank} color={getBadgeColor()} />
          <div className="text-center mt-4">
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-white/80 text-2xl font-bold mt-1">{score}</p>
            <p className="text-white/60 text-sm mt-1">
              {correctAnswers} out of {totalQuestions}
            </p>
          </div>
        </div>
      </div>
      <div 
        className={`${getHeight()} w-28 bg-[#3C1278]/50 rounded-t-lg backdrop-blur-sm 
        transform transition-all duration-300 group-hover:bg-[#3C1278]/70`} 
      />
    </div>
  );
};
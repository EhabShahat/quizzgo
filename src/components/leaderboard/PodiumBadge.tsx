import { Trophy, Award } from "lucide-react";

interface PodiumBadgeProps {
  rank: number;
  color: string;
}

export const PodiumBadge = ({ rank, color }: PodiumBadgeProps) => {
  return (
    <div 
      className={`${color} p-4 rounded-full shadow-lg transform transition-all duration-300 
      hover:scale-110 hover:rotate-12 cursor-pointer`}
    >
      {rank === 1 ? (
        <Trophy className="w-8 h-8 text-white" />
      ) : (
        <Award className="w-8 h-8 text-white" />
      )}
    </div>
  );
};
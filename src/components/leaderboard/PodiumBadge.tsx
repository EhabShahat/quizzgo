interface PodiumBadgeProps {
  rank: number;
  color: string;
}

export const PodiumBadge = ({ rank, color }: PodiumBadgeProps) => {
  return (
    <div 
      className={`${color} w-16 h-16 flex items-center justify-center text-3xl font-bold text-white
      clip-path-pentagon transform transition-all duration-300 hover:scale-110`}
      style={{
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
      }}
    >
      {rank}
    </div>
  );
};
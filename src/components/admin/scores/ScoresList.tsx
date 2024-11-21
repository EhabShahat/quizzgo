import { useInviteCodeStore } from "@/store/inviteCodeStore";
import { Trophy, Medal, Award } from "lucide-react";

interface Score {
  username: string;
  score: number;
  outOf: number;
}

const ScoresList = () => {
  const { codes } = useInviteCodeStore();
  
  // Placeholder data
  const scores: Score[] = [
    {
      username: "Johannes",
      score: 6895,
      outOf: 7
    },
    {
      username: "Jennie",
      score: 5928,
      outOf: 6
    },
    {
      username: "Victoria",
      score: 5848,
      outOf: 6
    },
    {
      username: "Winner",
      score: 5500,
      outOf: 6
    },
    {
      username: "iLNzeJ",
      score: 5200,
      outOf: 6
    }
  ];

  // Filter used codes and sort by score
  const usedCodes = codes
    .filter(code => code.used)
    .sort((a, b) => {
      const scoreA = scores.find(s => s.username === a.username)?.score || 0;
      const scoreB = scores.find(s => s.username === b.username)?.score || 0;
      return scoreB - scoreA;
    });

  // Get top 5 participants
  const topParticipants = usedCodes.slice(0, 5);

  return (
    <div className="relative min-h-[600px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-900 p-8">
      {/* Confetti Effect */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '8px',
            height: '8px',
            background: ['#FFD700', '#C0C0C0', '#CD7F32', '#FF69B4', '#87CEEB'][Math.floor(Math.random() * 5)],
            borderRadius: '50%',
            animation: `float ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Title */}
      <h2 className="relative text-3xl font-bold text-white text-center mb-12">
        Leaderboard
      </h2>

      {/* Podium Section */}
      <div className="relative flex items-end justify-center gap-4 mb-12 h-[400px]">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-32 bg-gradient-to-br from-[#C0C0C0] to-[#E8E8E8] p-1 rounded-full aspect-square flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <Medal className="w-16 h-16 text-white" />
          </div>
          <div className="glass-card p-4 text-center mb-4 w-full">
            <p className="text-lg font-bold text-white">{topParticipants[1]?.participantName || topParticipants[1]?.username}</p>
            <p className="text-2xl font-bold text-[#C0C0C0]">{scores.find(s => s.username === topParticipants[1]?.username)?.score || 0}</p>
            <p className="text-sm text-white/70">{scores.find(s => s.username === topParticipants[1]?.username)?.outOf || 0}/8 correct</p>
          </div>
          <div className="h-32 w-24 bg-gradient-to-t from-purple-800 to-purple-700 rounded-t-lg" />
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center -mt-16">
          <div className="w-40 bg-gradient-to-br from-[#FFD700] to-[#FFC000] p-1 rounded-full aspect-square flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <Trophy className="w-20 h-20 text-white" />
          </div>
          <div className="glass-card p-6 text-center mb-4 w-full">
            <p className="text-xl font-bold text-white">{topParticipants[0]?.participantName || topParticipants[0]?.username}</p>
            <p className="text-3xl font-bold text-[#FFD700]">{scores.find(s => s.username === topParticipants[0]?.username)?.score || 0}</p>
            <p className="text-sm text-white/70">{scores.find(s => s.username === topParticipants[0]?.username)?.outOf || 0}/8 correct</p>
          </div>
          <div className="h-40 w-32 bg-gradient-to-t from-purple-800 to-purple-700 rounded-t-lg" />
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-32 bg-gradient-to-br from-[#CD7F32] to-[#E8A972] p-1 rounded-full aspect-square flex items-center justify-center mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <Award className="w-16 h-16 text-white" />
          </div>
          <div className="glass-card p-4 text-center mb-4 w-full">
            <p className="text-lg font-bold text-white">{topParticipants[2]?.participantName || topParticipants[2]?.username}</p>
            <p className="text-2xl font-bold text-[#CD7F32]">{scores.find(s => s.username === topParticipants[2]?.username)?.score || 0}</p>
            <p className="text-sm text-white/70">{scores.find(s => s.username === topParticipants[2]?.username)?.outOf || 0}/8 correct</p>
          </div>
          <div className="h-24 w-24 bg-gradient-to-t from-purple-800 to-purple-700 rounded-t-lg" />
        </div>
      </div>

      {/* Runners Up Section */}
      <div className="relative space-y-4 max-w-2xl mx-auto">
        {topParticipants.slice(3, 5).map((participant, index) => {
          const scoreData = scores.find(s => s.username === participant.username);
          return (
            <div key={participant.code} className="glass-card p-4 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 4}</span>
                </div>
                <div>
                  <p className="font-bold text-white">{participant.participantName || participant.username}</p>
                  <p className="text-sm text-white/70">{scoreData?.outOf || 0}/8 correct</p>
                </div>
              </div>
              <p className="text-xl font-bold text-white">{scoreData?.score || 0}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoresList;
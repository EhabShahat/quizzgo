import { Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInviteCodeStore } from "@/store/inviteCodeStore";

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

  const top3Scores = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);

  // Filter used codes and sort by score
  const usedCodes = codes
    .filter(code => code.used)
    .sort((a, b) => {
      const scoreA = scores.find(s => s.username === a.username)?.score || 0;
      const scoreB = scores.find(s => s.username === b.username)?.score || 0;
      return scoreB - scoreA;
    });

  return (
    <div className="min-h-screen bg-[#5D3FD3] p-4 sm:p-8 relative overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <div 
            className="w-2 h-2 sm:w-3 sm:h-3 rotate-45"
            style={{
              backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEEAD'][Math.floor(Math.random() * 5)]
            }}
          />
        </div>
      ))}

      <div className="max-w-4xl mx-auto">
        <div className="relative h-[400px] sm:h-[500px] flex items-end justify-center gap-2 sm:gap-8 mb-8 sm:mb-12">
          {/* Second Place */}
          <div className="w-1/3 sm:w-1/4 animate-slideIn" style={{ height: '75%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-2 sm:p-6 relative">
              <div className="absolute -top-8 sm:-top-12 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-silver-400 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-2xl sm:text-4xl font-bold text-white transform -rotate-45">2</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-2 sm:mt-4 truncate max-w-[120px] sm:max-w-full">{top3Scores[1]?.username}</h3>
              </div>
              <div className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-3">{top3Scores[1]?.score}</div>
              <div className="text-sm sm:text-base text-white/70">{top3Scores[1]?.outOf} out of 8</div>
            </div>
          </div>

          {/* First Place */}
          <div className="w-1/3 sm:w-1/4 animate-slideIn" style={{ height: '85%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-2 sm:p-6 relative">
              <div className="absolute -top-8 sm:-top-12 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#FFD700] rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-2xl sm:text-4xl font-bold text-white transform -rotate-45">1</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-2 sm:mt-4 truncate max-w-[120px] sm:max-w-full">{top3Scores[0]?.username}</h3>
              </div>
              <div className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-3">{top3Scores[0]?.score}</div>
              <div className="text-sm sm:text-base text-white/70">{top3Scores[0]?.outOf} out of 8</div>
            </div>
          </div>

          {/* Third Place */}
          <div className="w-1/3 sm:w-1/4 animate-slideIn" style={{ height: '65%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-2 sm:p-6 relative">
              <div className="absolute -top-8 sm:-top-12 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-bronze-400 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-2xl sm:text-4xl font-bold text-white transform -rotate-45">3</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-2 sm:mt-4 truncate max-w-[120px] sm:max-w-full">{top3Scores[2]?.username}</h3>
              </div>
              <div className="text-3xl sm:text-5xl font-bold text-white mb-2 sm:mb-3">{top3Scores[2]?.score}</div>
              <div className="text-sm sm:text-base text-white/70">{top3Scores[2]?.outOf} out of 8</div>
            </div>
          </div>
        </div>

        {/* Scores Table */}
        <div className="glass-card p-4 sm:p-8 mt-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Detailed Scores</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">Participant Name</TableHead>
                  <TableHead className="text-white">Invite Code</TableHead>
                  <TableHead className="text-white text-right">Score</TableHead>
                  <TableHead className="text-white text-right">Questions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usedCodes.map((code, index) => {
                  const scoreData = scores.find(s => s.username === code.username);
                  return (
                    <TableRow key={code.code}>
                      <TableCell className="text-white font-medium">#{index + 1}</TableCell>
                      <TableCell className="text-white">
                        {code.participantName || code.username}
                      </TableCell>
                      <TableCell className="text-white/70">{code.code}</TableCell>
                      <TableCell className="text-white text-right">
                        {scoreData?.score || 'N/A'}
                      </TableCell>
                      <TableCell className="text-white text-right">
                        {scoreData ? `${scoreData.outOf}/8` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresList;

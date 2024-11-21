import { Trophy } from "lucide-react";

interface Score {
  username: string;
  score: number;
  outOf: number;
}

const ScoresList = () => {
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

  return (
    <div className="min-h-screen bg-[#5D3FD3] p-4 sm:p-8 relative overflow-hidden">
      {/* Confetti Animation */}
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
        {/* Podium Section */}
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

        {/* Runners-up Section */}
        <div className="glass-card p-4 sm:p-8 max-w-2xl mx-auto rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Runners-up</h3>
          <div className="grid gap-3 sm:gap-4">
            {scores.slice(3).map((score, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 sm:gap-4 bg-white/10 p-3 sm:p-4 rounded-xl hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                  <span className="text-base sm:text-lg font-bold text-white">{index + 4}</span>
                </div>
                <span className="text-base sm:text-lg font-medium text-white truncate">{score.username}</span>
                <div className="ml-auto flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-xl font-bold text-white">{score.score}</span>
                  <span className="text-xs sm:text-sm text-white/70">({score.outOf} out of 8)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresList;
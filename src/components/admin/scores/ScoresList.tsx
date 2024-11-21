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
    <div className="min-h-screen bg-[#5D3FD3] p-8 relative overflow-hidden">
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
            className="w-3 h-3 rotate-45"
            style={{
              backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEEAD'][Math.floor(Math.random() * 5)]
            }}
          />
        </div>
      ))}

      <div className="max-w-4xl mx-auto">
        {/* Podium Section */}
        <div className="relative h-[500px] flex items-end justify-center gap-8 mb-12">
          {/* Second Place */}
          <div className="w-1/4 animate-slideIn" style={{ height: '75%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-6 relative">
              <div className="absolute -top-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-silver-400 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-4xl font-bold text-white transform -rotate-45">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">{top3Scores[1]?.username}</h3>
              </div>
              <div className="text-5xl font-bold text-white mb-3">{top3Scores[1]?.score}</div>
              <div className="text-white/70">{top3Scores[1]?.outOf} out of 8</div>
            </div>
          </div>

          {/* First Place */}
          <div className="w-1/4 animate-slideIn" style={{ height: '85%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-6 relative">
              <div className="absolute -top-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-4xl font-bold text-white transform -rotate-45">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">{top3Scores[0]?.username}</h3>
              </div>
              <div className="text-5xl font-bold text-white mb-3">{top3Scores[0]?.score}</div>
              <div className="text-white/70">{top3Scores[0]?.outOf} out of 8</div>
            </div>
          </div>

          {/* Third Place */}
          <div className="w-1/4 animate-slideIn" style={{ height: '65%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-6 relative">
              <div className="absolute -top-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-bronze-400 rounded-full flex items-center justify-center transform rotate-45">
                  <span className="text-4xl font-bold text-white transform -rotate-45">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">{top3Scores[2]?.username}</h3>
              </div>
              <div className="text-5xl font-bold text-white mb-3">{top3Scores[2]?.score}</div>
              <div className="text-white/70">{top3Scores[2]?.outOf} out of 8</div>
            </div>
          </div>
        </div>

        {/* Runners-up Section */}
        <div className="glass-card p-8 max-w-2xl mx-auto rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Runners-up</h3>
          <div className="grid gap-4">
            {scores.slice(3).map((score, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{index + 4}</span>
                </div>
                <span className="text-lg font-medium text-white">{score.username}</span>
                <div className="ml-auto">
                  <span className="text-xl font-bold text-white">{score.score}</span>
                  <span className="text-white/70 text-sm ml-2">({score.outOf} out of 8)</span>
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
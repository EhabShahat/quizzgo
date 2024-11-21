import { Trophy } from "lucide-react";

interface Score {
  username: string;
  score: number;
  outOf: number;
}

const ScoresList = () => {
  // This is placeholder data. In a real application, this would come from your backend
  const scores: Score[] = [
    {
      username: "Johannes",
      score: 6895,
      outOf: 8
    },
    {
      username: "Jennie",
      score: 5928,
      outOf: 8
    },
    {
      username: "Victoria",
      score: 5848,
      outOf: 8
    },
    {
      username: "Winner",
      score: 5500,
      outOf: 8
    },
    {
      username: "iLNzeJ",
      score: 5200,
      outOf: 8
    }
  ];

  // Get top 3 scores
  const top3Scores = [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#5D3FD3] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Podium Section */}
        <div className="relative h-[400px] flex items-end justify-center gap-4">
          {/* Second Place */}
          <div className="relative w-1/4 animate-slideIn" style={{ height: '70%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-4">
              <div className="absolute -top-10">
                <div className="w-20 h-20 rounded-full bg-[#C0C0C0] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="text-white text-xl font-bold mt-2 text-center">{top3Scores[1]?.username}</div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{top3Scores[1]?.score}</div>
              <div className="text-white/70">{top3Scores[1]?.outOf} out of 8</div>
            </div>
          </div>

          {/* First Place */}
          <div className="relative w-1/4 animate-slideIn" style={{ height: '85%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-4">
              <div className="absolute -top-10">
                <div className="w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="text-white text-xl font-bold mt-2 text-center">{top3Scores[0]?.username}</div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{top3Scores[0]?.score}</div>
              <div className="text-white/70">{top3Scores[0]?.outOf} out of 8</div>
            </div>
          </div>

          {/* Third Place */}
          <div className="relative w-1/4 animate-slideIn" style={{ height: '55%' }}>
            <div className="h-full glass-card flex flex-col items-center justify-end p-4">
              <div className="absolute -top-10">
                <div className="w-20 h-20 rounded-full bg-[#CD7F32] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="text-white text-xl font-bold mt-2 text-center">{top3Scores[2]?.username}</div>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{top3Scores[2]?.score}</div>
              <div className="text-white/70">{top3Scores[2]?.outOf} out of 8</div>
            </div>
          </div>
        </div>

        {/* Runners-up Section */}
        <div className="glass-card p-6 max-w-md mx-auto">
          <h3 className="text-white font-bold mb-4 text-xl">Runners-up</h3>
          <div className="space-y-4">
            {scores.slice(3).map((score, index) => (
              <div key={index} className="flex items-center gap-4 text-white bg-white/10 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center font-bold">
                  {index + 4}
                </div>
                <div className="font-medium">{score.username}</div>
                <div className="ml-auto font-bold">{score.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Confetti Effect */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'][Math.floor(Math.random() * 5)]
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoresList;
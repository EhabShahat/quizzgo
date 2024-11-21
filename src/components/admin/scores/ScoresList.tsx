import { Trophy, Clock, User } from "lucide-react";

interface Score {
  username: string;
  score: number;
  timeTaken: string;
  completedAt: Date;
}

const ScoresList = () => {
  // This is a placeholder data. In a real application, this would come from your backend
  const scores: Score[] = [
    {
      username: "JohnDoe",
      score: 850,
      timeTaken: "12:30",
      completedAt: new Date(),
    },
    // Add more mock data as needed
  ];

  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Trophy className="h-4 w-4 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Quiz Scores</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {scores.length}
            </div>
            <div className="text-white/70">Total Participants</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Math.max(...scores.map(s => s.score))}
            </div>
            <div className="text-white/70">Highest Score</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length)}
            </div>
            <div className="text-white/70">Average Score</div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Participant
                    </div>
                  </th>
                  <th className="text-left p-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Score
                    </div>
                  </th>
                  <th className="text-left p-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Taken
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="p-4 text-white">{score.username}</td>
                    <td className="p-4 text-white">{score.score}</td>
                    <td className="p-4 text-white">{score.timeTaken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresList;
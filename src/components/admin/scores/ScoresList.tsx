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

  // Filter used codes and sort by score
  const usedCodes = codes
    .filter(code => code.used)
    .sort((a, b) => {
      const scoreA = scores.find(s => s.username === a.username)?.score || 0;
      const scoreB = scores.find(s => s.username === b.username)?.score || 0;
      return scoreB - scoreA;
    });

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Scores List</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
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
                <TableRow key={code.code} className="border-white/10">
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
  );
};

export default ScoresList;
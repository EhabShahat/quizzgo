import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ScoresList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch scores directly from Supabase using React Query
  const { data: scores = [], isLoading: isLoadingScores, error } = useQuery({
    queryKey: ['scores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch invite codes to match with scores
  const { data: inviteCodes = [], isLoading: isLoadingCodes } = useQuery({
    queryKey: ['invite-codes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('InviteCode')
        .select('*')
        .eq('used', true);
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleClearScores = async () => {
    try {
      const { error } = await supabase
        .from('scores')
        .delete()
        .neq('id', 0); // Delete all records

      if (error) throw error;

      // Refetch scores after clearing
      await queryClient.invalidateQueries({ queryKey: ['scores'] });

      toast({
        title: "Scores cleared",
        description: "All scores have been successfully cleared from the database",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear scores. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoadingScores || isLoadingCodes) {
    return (
      <Alert className="bg-white/5 border-white/10 text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Loading scores...
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert className="bg-white/5 border-white/10 text-white" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading scores. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Scores List</h2>
        </div>
        <Button
          onClick={handleClearScores}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All Scores
        </Button>
      </div>

      {scores.length === 0 ? (
        <Alert className="bg-white/5 border-white/10 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Waiting for participants to complete the quiz...
          </AlertDescription>
        </Alert>
      ) : (
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
              {scores.map((score, index) => {
                const inviteCode = inviteCodes.find(code => code.participant_name === score.participant_name);
                return (
                  <TableRow key={score.id} className="border-white/10">
                    <TableCell className="text-white font-medium">#{index + 1}</TableCell>
                    <TableCell className="text-white">
                      {score.participant_name}
                    </TableCell>
                    <TableCell className="text-white/70">{inviteCode?.code || 'N/A'}</TableCell>
                    <TableCell className="text-white text-right">
                      {score.score}
                    </TableCell>
                    <TableCell className="text-white text-right">
                      {`${score.correct_answers}/${score.total_questions}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ScoresList;
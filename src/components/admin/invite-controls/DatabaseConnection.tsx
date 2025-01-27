import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DatabaseConnectionProps {
  databaseUrl: string;
  anonKey: string;
  isLoading: boolean;
  onDatabaseUrlChange: (value: string) => void;
  onAnonKeyChange: (value: string) => void;
  onFetchParticipants: () => void;
}

export const DatabaseConnection = ({
  databaseUrl,
  anonKey,
  isLoading,
  onDatabaseUrlChange,
  onAnonKeyChange,
  onFetchParticipants,
}: DatabaseConnectionProps) => {
  return (
    <div className="space-y-4 p-4 bg-white/5 rounded-lg">
      <h4 className="text-sm font-medium text-white">External Database Connection</h4>
      
      <div className="space-y-2">
        <Label htmlFor="database-url" className="text-white">Database URL</Label>
        <Input
          id="database-url"
          type="text"
          value={databaseUrl}
          onChange={(e) => onDatabaseUrlChange(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
          placeholder="https://your-project.supabase.co"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="anon-key" className="text-white">Anon Key</Label>
        <Input
          id="anon-key"
          type="password"
          value={anonKey}
          onChange={(e) => onAnonKeyChange(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
          placeholder="your-anon-key"
        />
      </div>

      <Button
        onClick={onFetchParticipants}
        disabled={!databaseUrl || !anonKey || isLoading}
        className="w-full bg-purple-500 hover:bg-purple-600"
      >
        {isLoading ? 'Loading...' : 'Fetch Participants'}
      </Button>
    </div>
  );
};
import { format } from "date-fns";
import { Copy, User, ExternalLink } from "lucide-react";
import type { InviteCode } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InviteCodeItemProps {
  code: string;
  used: boolean;
  created_at: string;
  used_at?: string | null;
  participant_name?: string | null;
  onCopy: (code: string) => void;
  onDelete: (code: string) => void;
}

export const InviteCodeItem = ({
  code,
  used,
  created_at,
  used_at,
  participant_name,
  onCopy,
}: InviteCodeItemProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                used ? "bg-red-500" : "bg-green-500"
              }`}
            />
            {participant_name && (
              <span className="text-sm font-medium text-white">
                {participant_name}
              </span>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={used ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"}
          >
            {used ? "Used" : "Available"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs text-white/60">Invite Code:</p>
          <code className="px-2 py-1 rounded bg-white/10 text-white font-mono text-sm">
            {code}
          </code>
        </div>
        
        <div className="space-y-0.5 text-xs text-white/60">
          <p>Created: {format(new Date(created_at), "PPp")}</p>
          {used_at && (
            <p>Used: {format(new Date(used_at), "PPp")}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onCopy(code)}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => window.open(`/profile/${participant_name}`, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
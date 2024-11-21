import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

interface InviteCodeItemProps {
  code: string;
  used: boolean;
  createdAt: Date;
  usedAt?: Date;
  participantName?: string;
  onCopy: (code: string) => void;
  onDelete: (code: string) => void;
}

export const InviteCodeItem = ({
  code,
  used,
  createdAt,
  usedAt,
  participantName,
  onCopy,
  onDelete,
}: InviteCodeItemProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between group hover:bg-white/10 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-white/80">{code}</span>
          {participantName && (
            <span className="text-sm text-purple-400">({participantName})</span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/50">
            Created: {format(createdAt, "MMM d, yyyy 'at' h:mm a")}
          </span>
          {used && usedAt && (
            <span className="text-xs text-white/50">
              Used: {format(usedAt, "MMM d, yyyy 'at' h:mm a")}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            used ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
          }`}
        >
          {used ? "Used" : "Available"}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onCopy(code)}
              >
                <Copy className="w-4 h-4 text-white/70 hover:text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(code)}
              >
                <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
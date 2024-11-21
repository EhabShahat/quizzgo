import { format } from "date-fns";
import { Copy, Trash2 } from "lucide-react";

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
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${
            used ? "bg-red-500" : "bg-green-500"
          }`}
        />
        <div>
          <p className="font-mono text-white">{code}</p>
          <p className="text-sm text-white/60">
            Created: {format(createdAt, "PPp")}
            {usedAt && ` • Used: ${format(usedAt, "PPp")}`}
            {participantName && ` • For: ${participantName}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCopy(code)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4 text-white/60" />
        </button>
        <button
          onClick={() => onDelete(code)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-white/60" />
        </button>
      </div>
    </div>
  );
};
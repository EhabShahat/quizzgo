import { format } from "date-fns";
import { Copy, Trash2 } from "lucide-react";
import type { InviteCode } from "@/types/database";

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
            Created: {format(new Date(created_at), "PPp")}
            {used_at && ` • Used: ${format(new Date(used_at), "PPp")}`}
            {participant_name && ` • For: ${participant_name}`}
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
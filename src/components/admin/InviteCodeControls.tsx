import { Plus, Copy, FileSpreadsheet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteCodeControlsProps {
  bulkAmount: string;
  prefix: string;
  participantName: string;
  onBulkAmountChange: (value: string) => void;
  onPrefixChange: (value: string) => void;
  onParticipantNameChange: (value: string) => void;
  onGenerateSingle: () => void;
  onGenerateBulk: () => void;
  onDeleteAll: () => void;
  onCopyAll: () => void;
  onExportExcel: () => void;
}

export const InviteCodeControls = ({
  bulkAmount,
  prefix,
  participantName,
  onBulkAmountChange,
  onPrefixChange,
  onParticipantNameChange,
  onGenerateSingle,
  onGenerateBulk,
  onDeleteAll,
  onCopyAll,
  onExportExcel,
}: InviteCodeControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Generate Codes</h3>
        
        <div className="space-y-2">
          <Label className="text-white">Participant Name</Label>
          <Input
            type="text"
            value={participantName}
            onChange={(e) => onParticipantNameChange(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
            placeholder="Enter participant name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Bulk Generation Amount (1-100)</Label>
          <Input
            type="number"
            value={bulkAmount}
            onChange={(e) => onBulkAmountChange(e.target.value)}
            min="1"
            max="100"
            className="bg-white/5 border-white/10 text-white"
            placeholder="10"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Code Prefix (Optional)</Label>
          <Input
            type="text"
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
            placeholder="e.g., QUIZ2024"
          />
        </div>

        <div className="space-y-3">
          <Button
            onClick={onGenerateSingle}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Single Code
          </Button>

          <Button
            onClick={onGenerateBulk}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate {bulkAmount} Codes
          </Button>

          <Button
            onClick={onDeleteAll}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All Codes
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onCopyAll}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy All Codes
        </Button>

        <Button
          onClick={onExportExcel}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
      </div>
    </div>
  );
};
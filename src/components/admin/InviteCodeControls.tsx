import { Plus, Copy, FileSpreadsheet, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as XLSX from 'xlsx';

interface InviteCodeControlsProps {
  bulkAmount: string;
  prefix: string;
  participantNames: string;
  onBulkAmountChange: (value: string) => void;
  onPrefixChange: (value: string) => void;
  onParticipantNamesChange: (value: string) => void;
  onGenerateSingle: () => void;
  onGenerateBulk: () => void;
  onDeleteAll: () => void;
  onCopyAll: () => void;
  onExportExcel: () => void;
}

export const InviteCodeControls = ({
  bulkAmount,
  prefix,
  participantNames,
  onBulkAmountChange,
  onPrefixChange,
  onParticipantNamesChange,
  onGenerateSingle,
  onGenerateBulk,
  onDeleteAll,
  onCopyAll,
  onExportExcel,
}: InviteCodeControlsProps) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    let names: string[] = [];

    if (file.name.endsWith('.txt')) {
      const text = await file.text();
      names = text.split('\n').map(name => name.trim()).filter(Boolean);
    } else if (file.name.endsWith('.xlsx')) {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      names = data.flat().map(name => String(name).trim()).filter(Boolean);
    }

    if (names.length > 0) {
      onParticipantNamesChange(names.join('\n'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Generate Codes</h3>
        
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

        <div className="space-y-2">
          <Label className="text-white">
            Participant Names (One per line)
            <Button
              variant="ghost"
              className="ml-2 text-xs text-white/70 hover:text-white"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Import from file
            </Button>
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept=".txt,.xlsx"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Textarea
            value={participantNames}
            onChange={(e) => onParticipantNamesChange(e.target.value)}
            className="bg-white/5 border-white/10 text-white min-h-[100px]"
            placeholder="John Doe&#10;Jane Smith&#10;Alex Johnson"
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
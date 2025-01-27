import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import * as XLSX from 'xlsx';

interface ParticipantNamesProps {
  participantNames: string;
  onParticipantNamesChange: (value: string) => void;
}

export const ParticipantNames = ({
  participantNames,
  onParticipantNamesChange,
}: ParticipantNamesProps) => {
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
    <div className="space-y-2">
      <Label htmlFor="participant-names" className="text-white flex items-center justify-between">
        <span>Participant Names (One per line)</span>
        <div className="space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-white/70 hover:text-white"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            Import from file
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-white/70 hover:text-white"
            onClick={() => onParticipantNamesChange('')}
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </Label>
      <Input
        id="file-upload"
        type="file"
        accept=".txt,.xlsx"
        className="hidden"
        onChange={handleFileUpload}
      />
      <Textarea
        id="participant-names"
        value={participantNames}
        onChange={(e) => onParticipantNamesChange(e.target.value)}
        className="bg-white/5 border-white/10 text-white min-h-[100px]"
        placeholder="John Doe&#10;Jane Smith&#10;Alex Johnson"
      />
    </div>
  );
};
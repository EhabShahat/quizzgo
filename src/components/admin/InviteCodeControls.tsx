import { useState } from "react";
import { useParticipants } from "@/hooks/useParticipants";
import { BulkGeneration } from "./invite-controls/BulkGeneration";
import { ParticipantNames } from "./invite-controls/ParticipantNames";
import { ActionButtons } from "./invite-controls/ActionButtons";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Generate Codes</h3>
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            onClick={() => navigate('/external-database')}
          >
            <Database className="w-4 h-4 mr-2" />
            External Database
          </Button>
        </div>

        <BulkGeneration
          bulkAmount={bulkAmount}
          prefix={prefix}
          onBulkAmountChange={onBulkAmountChange}
          onPrefixChange={onPrefixChange}
        />

        <ParticipantNames
          participantNames={participantNames}
          onParticipantNamesChange={onParticipantNamesChange}
        />

        <ActionButtons
          bulkAmount={bulkAmount}
          onGenerateSingle={onGenerateSingle}
          onGenerateBulk={onGenerateBulk}
          onDeleteAll={onDeleteAll}
          onCopyAll={onCopyAll}
          onExportExcel={onExportExcel}
        />
      </div>
    </div>
  );
};
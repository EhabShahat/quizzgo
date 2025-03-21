
import { useState } from "react";
import { BulkGeneration } from "./invite-controls/BulkGeneration";
import { ParticipantNames } from "./invite-controls/ParticipantNames";
import { ActionButtons } from "./invite-controls/ActionButtons";

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
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Generate Codes</h3>

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

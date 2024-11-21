import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InviteCodeItem } from "./InviteCodeItem";
import { InviteCodeControls } from "./InviteCodeControls";
import { InviteCodesDashboard } from "./InviteCodesDashboard";
import { useInviteCodeStore } from "@/store/inviteCodeStore";
import type { InviteCode } from "@/types/database";

const InviteCodes = () => {
  const [bulkAmount, setBulkAmount] = useState("10");
  const [prefix, setPrefix] = useState("");
  const [participantNames, setParticipantNames] = useState("");
  const { toast } = useToast();
  const { codes, addCode, addCodes, deleteCode, deleteAllCodes } = useInviteCodeStore();

  const generateCode = (prefix: string, participantName?: string): InviteCode => ({
    code: prefix ? `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : Math.random().toString(36).substring(2, 8).toUpperCase(),
    used: false,
    username: participantName || "Guest",
    participant_name: participantName || null,
    created_at: new Date().toISOString(),
    used_at: null
  });

  const handleGenerateSingle = () => {
    const names = participantNames.split('\n').filter(name => name.trim());
    const participantName = names[0]?.trim() || undefined;
    const newCode = generateCode(prefix, participantName);
    addCode(newCode.code, newCode.username);
    toast({
      title: "Code Generated",
      description: `New code: ${newCode.code}${participantName ? ` for ${participantName}` : ''}`,
    });
  };

  const handleGenerateBulk = () => {
    const amount = Math.min(Math.max(parseInt(bulkAmount) || 1, 1), 100);
    const names = participantNames.split('\n')
      .map(name => name.trim())
      .filter(Boolean);

    const newCodes = Array.from({ length: amount }, (_, index) => 
      generateCode(prefix, names[index])
    );

    addCodes(newCodes);
    toast({
      title: "Codes Generated",
      description: `Generated ${amount} new codes`,
    });
  };

  const handleCopyAll = async () => {
    if (codes.length === 0) {
      toast({
        title: "No codes to copy",
        description: "Generate some codes first",
        variant: "destructive",
      });
      return;
    }
    
    const textToCopy = codes.map(c => 
      `${c.code}${c.participant_name ? ` - ${c.participant_name}` : ''}`
    ).join("\n");
    
    await navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to clipboard",
      description: "All codes have been copied to your clipboard",
    });
  };

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code has been copied to your clipboard",
    });
  };

  const handleDeleteCode = (codeToDelete: string) => {
    deleteCode(codeToDelete);
    toast({
      title: "Code deleted",
      description: "The code has been removed",
    });
  };

  const handleDeleteAll = () => {
    if (codes.length === 0) {
      toast({
        title: "No codes to delete",
        description: "Generate some codes first",
        variant: "destructive",
      });
      return;
    }
    
    deleteAllCodes();
    toast({
      title: "Codes deleted",
      description: "All codes have been deleted",
    });
  };

  const handleExportExcel = () => {
    if (codes.length === 0) {
      toast({
        title: "No codes to export",
        description: "Generate some codes first",
        variant: "destructive",
      });
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Participant Name,Status,Created At,Used At\n" +
      codes.map(code => 
        `${code.code},${code.participant_name || ''},${code.used ? "Used" : "Available"},${code.created_at},${code.used_at || ''}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invite-codes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: "Codes have been exported to CSV",
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Invite Codes</h2>
      </div>

      <InviteCodesDashboard codes={codes} />

      <div className="space-y-6">
        <InviteCodeControls
          bulkAmount={bulkAmount}
          prefix={prefix}
          participantNames={participantNames}
          onBulkAmountChange={setBulkAmount}
          onPrefixChange={setPrefix}
          onParticipantNamesChange={setParticipantNames}
          onGenerateSingle={handleGenerateSingle}
          onGenerateBulk={handleGenerateBulk}
          onDeleteAll={handleDeleteAll}
          onCopyAll={handleCopyAll}
          onExportExcel={handleExportExcel}
        />

        <div className="mt-8">
          {codes.length === 0 ? (
            <p className="text-center text-white/60">No invite codes generated yet.</p>
          ) : (
            <div className="space-y-2">
              <p className="font-semibold text-white mb-4">Generated Codes:</p>
              <div className="space-y-2">
                {codes.map((code) => (
                  <InviteCodeItem
                    key={code.code}
                    code={code.code}
                    used={code.used}
                    created_at={code.created_at}
                    used_at={code.used_at}
                    participant_name={code.participant_name}
                    onCopy={handleCopyCode}
                    onDelete={handleDeleteCode}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteCodes;
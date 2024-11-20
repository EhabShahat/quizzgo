import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InviteCodeItem } from "./InviteCodeItem";
import { InviteCodeControls } from "./InviteCodeControls";

interface InviteCode {
  code: string;
  used: boolean;
  createdAt: Date;
}

const InviteCodes = () => {
  const [bulkAmount, setBulkAmount] = useState("10");
  const [prefix, setPrefix] = useState("");
  const [codes, setCodes] = useState<InviteCode[]>([]);
  const { toast } = useToast();

  const generateCode = (prefix: string) => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return {
      code: prefix ? `${prefix}-${random}` : random,
      used: false,
      createdAt: new Date(),
    };
  };

  const handleGenerateSingle = () => {
    const newCode = generateCode(prefix);
    setCodes([...codes, newCode]);
    toast({
      title: "Code Generated",
      description: `New code: ${newCode.code}`,
    });
  };

  const handleGenerateBulk = () => {
    const amount = Math.min(Math.max(parseInt(bulkAmount) || 1, 1), 100);
    const newCodes = Array.from({ length: amount }, () => generateCode(prefix));
    setCodes([...codes, ...newCodes]);
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
    
    await navigator.clipboard.writeText(codes.map(c => c.code).join("\n"));
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
    setCodes(codes.filter(c => c.code !== codeToDelete));
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
    
    setCodes([]);
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
      "Code,Status,Created At\n" +
      codes.map(code => 
        `${code.code},${code.used ? "Used" : "Available"},${code.createdAt.toLocaleString()}`
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

      <div className="space-y-6">
        <InviteCodeControls
          bulkAmount={bulkAmount}
          prefix={prefix}
          onBulkAmountChange={setBulkAmount}
          onPrefixChange={setPrefix}
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
                {codes.map((code, index) => (
                  <InviteCodeItem
                    key={index}
                    code={code.code}
                    used={code.used}
                    createdAt={code.createdAt}
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
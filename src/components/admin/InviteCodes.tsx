import { useState } from "react";
import { Plus, Copy, FileSpreadsheet, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const InviteCodes = () => {
  const [bulkAmount, setBulkAmount] = useState("10");
  const [prefix, setPrefix] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const { toast } = useToast();

  const generateCode = (prefix: string) => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return prefix ? `${prefix}-${random}` : random;
  };

  const handleGenerateSingle = () => {
    const newCode = generateCode(prefix);
    setCodes([...codes, newCode]);
    toast({
      title: "Code Generated",
      description: `New code: ${newCode}`,
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
    
    await navigator.clipboard.writeText(codes.join("\n"));
    toast({
      title: "Copied to clipboard",
      description: "All codes have been copied to your clipboard",
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

    const csvContent = "data:text/csv;charset=utf-8," + codes.join("\n");
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Generate Codes</h3>
          
          <div className="space-y-2">
            <Label className="text-white">Bulk Generation Amount (1-100)</Label>
            <Input
              type="number"
              value={bulkAmount}
              onChange={(e) => setBulkAmount(e.target.value)}
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
              onChange={(e) => setPrefix(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g., QUIZ2024"
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGenerateSingle}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Single Code
            </Button>

            <Button
              onClick={handleGenerateBulk}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate {bulkAmount} Codes
            </Button>

            <Button
              onClick={handleDeleteAll}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All Codes
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleCopyAll}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy All Codes
          </Button>

          <Button
            onClick={handleExportExcel}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        <div className="mt-8 text-center text-white/60">
          {codes.length === 0 ? (
            "No invite codes generated yet."
          ) : (
            <div className="space-y-2">
              <p className="font-semibold text-white">Generated Codes:</p>
              <div className="bg-white/5 rounded-lg p-4 text-left">
                {codes.map((code, index) => (
                  <div key={index} className="text-white/80">{code}</div>
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
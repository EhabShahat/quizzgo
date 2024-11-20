import { useState } from "react";
import { Plus, Copy, FileSpreadsheet, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

        <div className="mt-8">
          {codes.length === 0 ? (
            <p className="text-center text-white/60">No invite codes generated yet.</p>
          ) : (
            <div className="space-y-2">
              <p className="font-semibold text-white mb-4">Generated Codes:</p>
              <div className="space-y-2">
                {codes.map((code, index) => (
                  <div 
                    key={index} 
                    className="bg-white/5 rounded-lg p-3 flex items-center justify-between group hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/80">{code.code}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        code.used ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {code.used ? 'Used' : 'Available'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyCode(code.code)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="w-4 h-4 text-white/70 hover:text-white" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy code</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCode(code.code)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete code</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
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
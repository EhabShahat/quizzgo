import { Button } from "@/components/ui/button";
import { Plus, Copy, FileSpreadsheet, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  bulkAmount: string;
  onGenerateSingle: () => void;
  onGenerateBulk: () => void;
  onDeleteAll: () => void;
  onCopyAll: () => void;
  onExportExcel: () => void;
}

export const ActionButtons = ({
  bulkAmount,
  onGenerateSingle,
  onGenerateBulk,
  onDeleteAll,
  onCopyAll,
  onExportExcel,
}: ActionButtonsProps) => {
  return (
    <>
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
    </>
  );
};
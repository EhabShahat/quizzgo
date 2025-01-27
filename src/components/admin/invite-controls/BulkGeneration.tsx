import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BulkGenerationProps {
  bulkAmount: string;
  prefix: string;
  onBulkAmountChange: (value: string) => void;
  onPrefixChange: (value: string) => void;
}

export const BulkGeneration = ({
  bulkAmount,
  prefix,
  onBulkAmountChange,
  onPrefixChange,
}: BulkGenerationProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="bulk-amount" className="text-white">Bulk Generation Amount (1-100)</Label>
        <Input
          id="bulk-amount"
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
        <Label htmlFor="prefix" className="text-white">Code Prefix (Optional)</Label>
        <Input
          id="prefix"
          type="text"
          value={prefix}
          onChange={(e) => onPrefixChange(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
          placeholder="e.g., QUIZ2024"
        />
      </div>
    </>
  );
};
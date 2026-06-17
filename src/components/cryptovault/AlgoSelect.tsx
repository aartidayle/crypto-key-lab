import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AesAlgorithm } from "@/lib/crypto";

interface Props {
  value: AesAlgorithm;
  onChange: (v: AesAlgorithm) => void;
}

export function AlgoSelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as AesAlgorithm)}>
      <SelectTrigger className="w-full font-mono">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="AES-128">AES-128</SelectItem>
        <SelectItem value="AES-256">AES-256</SelectItem>
      </SelectContent>
    </Select>
  );
}

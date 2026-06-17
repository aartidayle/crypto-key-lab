import { useState } from "react";
import { Hash, Sparkles, Trash2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateHashes, type HashResult } from "@/lib/crypto";
import { CopyButton } from "./CopyButton";

type Row = { name: keyof HashResult; label: string; tone: "danger" | "warn" | "ok" };
const ROWS: Row[] = [
  { name: "md5", label: "MD5", tone: "danger" },
  { name: "sha1", label: "SHA-1", tone: "warn" },
  { name: "sha256", label: "SHA-256", tone: "ok" },
  { name: "sha512", label: "SHA-512", tone: "ok" },
];

export function HashModule() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult | null>(null);

  const handleGenerate = () => {
    if (!input) return toast.error("Please enter text to hash");
    setHashes(generateHashes(input));
    toast.success("Hashes generated");
  };

  const handleClear = () => {
    setInput("");
    setHashes(null);
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary glow-primary">
            <Hash className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-mono">Hash Generator</CardTitle>
            <CardDescription>One-way fingerprints for integrity checks.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="hash-input">Input</Label>
            <span className="font-mono text-xs text-muted-foreground">{input.length} chars</span>
          </div>
          <Textarea
            id="hash-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type any text — passwords, file contents, messages..."
            className="min-h-24 font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleGenerate} className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate Hashes
          </Button>
          <Button variant="outline" onClick={handleClear} className="gap-2">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="space-y-3">
          {ROWS.map((row) => {
            const value = hashes?.[row.name] ?? "";
            return (
              <div
                key={row.name}
                className="rounded-md border border-border/60 bg-background/40 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold">{row.label}</span>
                    {row.tone === "danger" && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" /> Insecure
                      </Badge>
                    )}
                    {row.tone === "warn" && (
                      <Badge
                        className="gap-1 border-transparent bg-warning/20 text-warning hover:bg-warning/20"
                      >
                        <AlertTriangle className="h-3 w-3" /> Deprecated
                      </Badge>
                    )}
                    {row.tone === "ok" && (
                      <Badge className="border-transparent bg-primary/15 text-primary hover:bg-primary/15">
                        Trusted
                      </Badge>
                    )}
                  </div>
                  <CopyButton text={value} label="Copy" />
                </div>
                <p className="break-all font-mono text-xs text-primary/90 min-h-[1.25rem]">
                  {value || <span className="text-muted-foreground">—</span>}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

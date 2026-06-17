import { useState } from "react";
import { Lock, Eye, EyeOff, Trash2, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { encryptText, type AesAlgorithm } from "@/lib/crypto";
import { AlgoSelect } from "./AlgoSelect";
import { CopyButton } from "./CopyButton";

export function EncryptModule() {
  const [plaintext, setPlaintext] = useState("");
  const [password, setPassword] = useState("");
  const [algo, setAlgo] = useState<AesAlgorithm>("AES-256");
  const [ciphertext, setCiphertext] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleEncrypt = () => {
    if (!plaintext.trim()) return toast.error("Please enter text to encrypt");
    if (!password) return toast.error("Please enter a password / secret key");
    try {
      const ct = encryptText(plaintext, password, algo);
      setCiphertext(ct);
      toast.success(`Encrypted with ${algo}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Encryption failed");
    }
  };

  const handleClear = () => {
    setPlaintext("");
    setPassword("");
    setCiphertext("");
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary glow-primary">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-mono">Encryption</CardTitle>
            <CardDescription>Turn plaintext into AES ciphertext.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="enc-plain">Plaintext</Label>
            <span className="font-mono text-xs text-muted-foreground">
              {plaintext.length} chars
            </span>
          </div>
          <Textarea
            id="enc-plain"
            placeholder="Type or paste the message you want to encrypt..."
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="min-h-28 font-mono text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="enc-pwd">Secret Key</Label>
            <div className="relative">
              <Input
                id="enc-pwd"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Strong passphrase"
                className="pr-9 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Toggle password visibility"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <AlgoSelect value={algo} onChange={setAlgo} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEncrypt} className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Encrypt
          </Button>
          <Button variant="outline" onClick={handleClear} className="gap-2">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Ciphertext</Label>
            <CopyButton text={ciphertext} label="Copy" />
          </div>
          <Textarea
            readOnly
            value={ciphertext}
            placeholder="Encrypted output will appear here..."
            className="min-h-28 break-all font-mono text-xs text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

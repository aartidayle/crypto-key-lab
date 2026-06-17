import { useState } from "react";
import { Unlock, Eye, EyeOff, Trash2, KeyRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { decryptText, type AesAlgorithm } from "@/lib/crypto";
import { AlgoSelect } from "./AlgoSelect";
import { CopyButton } from "./CopyButton";

export function DecryptModule() {
  const [ciphertext, setCiphertext] = useState("");
  const [password, setPassword] = useState("");
  const [algo, setAlgo] = useState<AesAlgorithm>("AES-256");
  const [plaintext, setPlaintext] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleDecrypt = () => {
    if (!ciphertext.trim()) return toast.error("Please paste encrypted text");
    if (!password) return toast.error("Please enter the secret key");
    try {
      const pt = decryptText(ciphertext, password, algo);
      setPlaintext(pt);
      toast.success("Decryption successful");
    } catch (e) {
      setPlaintext("");
      toast.error(e instanceof Error ? e.message : "Decryption failed");
    }
  };

  const handleClear = () => {
    setCiphertext("");
    setPassword("");
    setPlaintext("");
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary glow-primary">
            <Unlock className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-mono">Decryption</CardTitle>
            <CardDescription>Reverse AES ciphertext back to plaintext.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="dec-cipher">Encrypted Text</Label>
            <span className="font-mono text-xs text-muted-foreground">
              {ciphertext.length} chars
            </span>
          </div>
          <Textarea
            id="dec-cipher"
            placeholder="Paste the ciphertext to decrypt..."
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="min-h-28 break-all font-mono text-xs"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dec-pwd">Secret Key</Label>
            <div className="relative">
              <Input
                id="dec-pwd"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="The same passphrase used to encrypt"
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
          <Button onClick={handleDecrypt} className="gap-2">
            <KeyRound className="h-4 w-4" /> Decrypt
          </Button>
          <Button variant="outline" onClick={handleClear} className="gap-2">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Plaintext</Label>
            <CopyButton text={plaintext} label="Copy" />
          </div>
          <Textarea
            readOnly
            value={plaintext}
            placeholder="Decrypted output will appear here..."
            className="min-h-28 font-mono text-sm text-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

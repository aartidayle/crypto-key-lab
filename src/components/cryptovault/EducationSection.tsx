import { BookOpen, Lock, Hash, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EducationSection() {
  return (
    <section id="learn" className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="font-mono text-2xl font-semibold">Learn the difference</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Lock className="h-4 w-4 text-primary" /> Encryption
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Encryption converts <span className="text-foreground">plaintext into ciphertext</span>.</p>
            <p>• It is <span className="text-foreground">reversible</span> when you have the correct secret key.</p>
            <p>• <span className="text-foreground">AES</span> is a symmetric algorithm — the same key encrypts and decrypts.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Hash className="h-4 w-4 text-primary" /> Hashing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Hashing produces a <span className="text-foreground">fixed-length fingerprint</span> of any input.</p>
            <p>• It is <span className="text-foreground">one-way</span> — you cannot reverse a hash back to the original.</p>
            <p>• Used for <span className="text-foreground">integrity verification</span> and password storage.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-warning/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <ShieldAlert className="h-4 w-4 text-warning" /> Security Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 text-sm md:grid-cols-2">
            <li className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
              <span className="font-mono font-semibold text-destructive">MD5</span> is considered
              insecure and should only be used for educational purposes.
            </li>
            <li className="rounded-md border border-warning/30 bg-warning/5 p-3">
              <span className="font-mono font-semibold text-warning">SHA-1</span> is deprecated
              for many security applications.
            </li>
            <li className="rounded-md border border-primary/30 bg-primary/5 p-3">
              <span className="font-mono font-semibold text-primary">SHA-256 / SHA-512</span> are
              currently trusted for integrity verification.
            </li>
            <li className="rounded-md border border-primary/30 bg-primary/5 p-3">
              <span className="font-mono font-semibold text-primary">AES-256</span> is widely used
              as an industry-standard encryption algorithm.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

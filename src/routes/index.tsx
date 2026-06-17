import { createFileRoute } from "@tanstack/react-router";
import { Shield, Lock, Unlock, Hash, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { EncryptModule } from "@/components/cryptovault/EncryptModule";
import { DecryptModule } from "@/components/cryptovault/DecryptModule";
import { HashModule } from "@/components/cryptovault/HashModule";
import { EducationSection } from "@/components/cryptovault/EducationSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CryptoVault — Encryption, Decryption & Hashing Toolkit" },
      {
        name: "description",
        content:
          "CryptoVault is an educational cybersecurity toolkit to encrypt, decrypt and hash text using AES-128, AES-256, MD5, SHA-1, SHA-256 and SHA-512.",
      },
      { property: "og:title", content: "CryptoVault — Cryptography Toolkit" },
      {
        property: "og:description",
        content: "Learn the difference between encryption and hashing with a beginner-friendly toolkit.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Toaster theme="dark" richColors closeButton />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary glow-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="font-mono text-base font-semibold tracking-tight">
                Crypto<span className="text-primary">Vault</span>
              </p>
              <p className="text-[11px] text-muted-foreground">Educational cryptography toolkit</p>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            <a href="#tools" className="hover:text-foreground">Tools</a>
            <a href="#learn" className="hover:text-foreground">Learn</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-mono text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            secure // educational // open
          </div>
          <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl">
            See how <span className="text-primary">encryption</span> &amp;{" "}
            <span className="text-primary">hashing</span> really work
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            CryptoVault lets you experiment with AES encryption, decryption and the most common
            hash functions — all in your browser, nothing leaves your machine.
          </p>
        </section>

        {/* Tools */}
        <section id="tools" className="mb-12">
          <Tabs defaultValue="encrypt" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card">
              <TabsTrigger value="encrypt" className="gap-2 font-mono">
                <Lock className="h-4 w-4" /> Encrypt
              </TabsTrigger>
              <TabsTrigger value="decrypt" className="gap-2 font-mono">
                <Unlock className="h-4 w-4" /> Decrypt
              </TabsTrigger>
              <TabsTrigger value="hash" className="gap-2 font-mono">
                <Hash className="h-4 w-4" /> Hash
              </TabsTrigger>
            </TabsList>
            <TabsContent value="encrypt" className="mt-6">
              <EncryptModule />
            </TabsContent>
            <TabsContent value="decrypt" className="mt-6">
              <DecryptModule />
            </TabsContent>
            <TabsContent value="hash" className="mt-6">
              <HashModule />
            </TabsContent>
          </Tabs>
        </section>

        <EducationSection />
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p className="font-mono">
          CryptoVault · Built for learning · All operations run client-side in your browser
        </p>
      </footer>
    </div>
  );
}

import Link from "next/link"
import { PixelBackground } from "@/components/pixel-background"
import { EnumerationGenerator } from "@/components/enumeration-generator"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <PixelBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl space-y-8">
          <header className="text-center space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              <div className="space-y-0.5">
                <div>ENUMERATION TOOL</div>
                <div>OPERATING SINCE: 2025</div>
              </div>
              <div className="space-y-0.5 text-right">
                <div>STATUS: ONLINE</div>
                <div>MODE: ACTIVE</div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Enum Generator</h1>

            <p className="text-sm text-muted-foreground font-mono max-w-2xl mx-auto">
              Generate extensive username and password enumerations from your input terms. Supports multiple separators,
              capitalizations, and pattern variations.
            </p>

            <div className="flex justify-center">
              <Button asChild className="font-mono uppercase text-xs tracking-wider">
                <Link href="#generator">Accéder au générateur</Link>
              </Button>
            </div>
          </header>

          <EnumerationGenerator />

          <footer className="text-center">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              WE TRANSFORM TERMS INTO POSSIBILITIES
            </p>
          </footer>
        </div>
      </div>
    </main>
  )
}

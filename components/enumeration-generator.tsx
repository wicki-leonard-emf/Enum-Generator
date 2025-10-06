"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X, Download, Plus, ChevronDown } from "lucide-react"

type GenerationMode = "simple" | "medium" | "hard"

const toLower = (value: string) => value.toLowerCase()
const toUpper = (value: string) => value.toUpperCase()
const toTitleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
const identity = (value: string) => value

const capitalizationsByMode: Record<GenerationMode, Array<(value: string) => string>> = {
  simple: [toLower, toTitleCase, toUpper, identity],
  medium: [toLower, toUpper, toTitleCase, identity],
  hard: [toLower, toUpper, toTitleCase, identity],
}

const separators = ["", "_", "-", "."]

const numbersByMode: Record<GenerationMode, string[]> = {
  simple: ["1", "123"],
  medium: ["1", "2", "3", "12", "123", "2024", "2025"],
  hard: ["1", "2", "3", "123", "2023", "2024", "2025", "01", "00", "99"],
}

const specialCharsByMode: Record<GenerationMode, string[]> = {
  simple: ["!"],
  medium: ["!", "@", "#"],
  hard: ["!", "@", "#", "$", "*"],
}

const numberSeparatorsByMode: Record<GenerationMode, string[]> = {
  simple: ["", "-"],
  medium: separators,
  hard: separators,
}

const modeLabels: Record<GenerationMode, string> = {
  simple: "Simple",
  medium: "Medium",
  hard: "Hard",
}

const modeDescriptions: Record<GenerationMode, string> = {
  simple: "Variations essentielles et légères.",
  medium: "Combinaisons équilibrées avec ajouts courants.",
  hard: "Exploration exhaustive avec toutes les variations possibles.",
}

function buildEnumerations(terms: string[], mode: GenerationMode) {
  const results = new Set<string>()
  if (terms.length === 0) {
    return []
  }

  const capitalizationTransforms = capitalizationsByMode[mode]
  const variantMap = new Map<string, string[]>()

  terms.forEach((term) => {
    const variants = Array.from(new Set(capitalizationTransforms.map((transform) => transform(term))))
    variantMap.set(term, variants)
    variants.forEach((variant) => results.add(variant))
  })

  if (mode !== "simple" && terms.length >= 2) {
    for (let i = 0; i < terms.length; i++) {
      for (let j = 0; j < terms.length; j++) {
        if (i === j) continue
        const firstVariants = variantMap.get(terms[i]) ?? []
        const secondVariants = variantMap.get(terms[j]) ?? []
        separators.forEach((separator) => {
          firstVariants.forEach((first) => {
            secondVariants.forEach((second) => {
              results.add(`${first}${separator}${second}`)
            })
          })
        })
      }
    }
  }

  if (mode === "hard" && terms.length >= 3) {
    for (let i = 0; i < terms.length; i++) {
      for (let j = 0; j < terms.length; j++) {
        for (let k = 0; k < terms.length; k++) {
          if (i === j || j === k || i === k) continue
          const firstVariants = variantMap.get(terms[i]) ?? []
          const secondVariants = variantMap.get(terms[j]) ?? []
          const thirdVariants = variantMap.get(terms[k]) ?? []
          separators.forEach((firstSeparator) => {
            separators.forEach((secondSeparator) => {
              firstVariants.forEach((first) => {
                secondVariants.forEach((second) => {
                  thirdVariants.forEach((third) => {
                    results.add(`${first}${firstSeparator}${second}${secondSeparator}${third}`)
                  })
                })
              })
            })
          })
        }
      }
    }
  }

  const numbers = numbersByMode[mode]
  const numberSeparators = numberSeparatorsByMode[mode]

  terms.forEach((term) => {
    const variants = variantMap.get(term) ?? []
    numbers.forEach((number) => {
      numberSeparators.forEach((separator) => {
        variants.forEach((variant) => {
          results.add(`${variant}${separator}${number}`)
          results.add(`${number}${separator}${variant}`)
        })
      })
    })
  })

  const specialChars = specialCharsByMode[mode]
  terms.forEach((term) => {
    const variants = variantMap.get(term) ?? []
    specialChars.forEach((char) => {
      variants.forEach((variant) => {
        results.add(`${variant}${char}`)
        results.add(`${char}${variant}`)
      })
    })
  })

  if (mode !== "simple") {
    terms.forEach((term) => {
      results.add(`${term}123`)
      results.add(`${term}!`)
      results.add(`${term}@123`)
      results.add(`admin${term}`)
      results.add(`${term}admin`)
      results.add(`user${term}`)
      results.add(`${term}user`)
    })
  }

  if (mode === "hard") {
    const leetMap: Record<string, string> = {
      a: "4",
      e: "3",
      i: "1",
      o: "0",
      s: "5",
      t: "7",
    }
    terms.forEach((term) => {
      let leet = term.toLowerCase()
      Object.entries(leetMap).forEach(([char, replacement]) => {
        leet = leet.replace(new RegExp(char, "g"), replacement)
      })
      if (leet !== term.toLowerCase()) {
        results.add(leet)
        results.add(leet.toUpperCase())
      }
    })
  }

  return Array.from(results)
}

export function EnumerationGenerator() {
  const [terms, setTerms] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [generated, setGenerated] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [mode, setMode] = useState<GenerationMode>("hard")

  const addTerm = () => {
    if (currentInput.trim() && !terms.includes(currentInput.trim())) {
      setTerms([...terms, currentInput.trim()])
      setCurrentInput("")
    }
  }

  const removeTerm = (term: string) => {
    setTerms(terms.filter((t) => t !== term))
  }

  const generateEnumerations = () => {
    if (terms.length === 0) return

    setIsGenerating(true)

    // Simulate generation delay for UX
    setTimeout(() => {
      const results = buildEnumerations(terms, mode).sort((a, b) => a.localeCompare(b))
      setGenerated(results)
      setIsGenerating(false)
    }, 500)
  }

  const downloadList = () => {
    const blob = new Blob([generated.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "enumerations.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div id="generator" className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTerm()}
              placeholder="Enter term (e.g., john, admin, 2023)"
              className="flex-1 bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={addTerm}
              variant="secondary"
              size="icon"
              className="bg-secondary hover:bg-accent text-secondary-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {terms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {terms.map((term) => (
                <div
                  key={term}
                  className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-md text-sm font-mono text-accent-foreground"
                >
                  {term}
                  <button onClick={() => removeTerm(term)} className="hover:text-foreground transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={generateEnumerations}
            disabled={terms.length === 0 || isGenerating}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-mono"
          >
            {isGenerating ? "GENERATING..." : "GENERATE ENUMERATIONS"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between font-mono uppercase text-xs tracking-wider"
              >
                Mode: {modeLabels[mode]}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              <DropdownMenuLabel>Mode de génération</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={mode} onValueChange={(value) => setMode(value as GenerationMode)}>
                {(Object.keys(modeLabels) as GenerationMode[]).map((value) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={value}
                    className="flex-col items-start gap-0.5 leading-tight font-mono text-xs"
                  >
                    <span className="font-semibold text-foreground text-sm">{modeLabels[value]}</span>
                    <span className="text-muted-foreground text-[11px]">{modeDescriptions[value]}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-[11px] text-muted-foreground font-mono text-center">{modeDescriptions[mode]}</p>
        </div>
      </Card>

      {generated.length > 0 && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-mono text-foreground">GENERATED ENUMERATIONS</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {generated.length.toLocaleString()} combinations
                </p>
              </div>
              <Button
                onClick={downloadList}
                variant="secondary"
                size="sm"
                className="bg-secondary hover:bg-accent text-secondary-foreground font-mono gap-2"
              >
                <Download className="h-4 w-4" />
                DOWNLOAD
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-md bg-background/50 p-4 border border-border/30">
              <div className="space-y-1 font-mono text-xs text-muted-foreground">
                {generated.map((item, index) => (
                  <div key={index} className="hover:text-foreground transition-colors py-0.5">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

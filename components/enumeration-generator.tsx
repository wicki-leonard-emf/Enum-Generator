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
import { X, Download, Plus, ChevronDown, Copy } from "lucide-react"

/**
 * Generation mode types:
 * - simple: Essential variations with basic combinations
 * - medium: Balanced combinations with common additions
 * - hard: Exhaustive exploration with all possible variations
 */
type GenerationMode = "simple" | "medium" | "hard"

/**
 * Capitalization transformation functions
 */
const toLower = (value: string) => value.toLowerCase()
const toUpper = (value: string) => value.toUpperCase()
const toTitleCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
const identity = (value: string) => value

/**
 * Capitalization strategies for each generation mode
 */
const capitalizationsByMode: Record<GenerationMode, Array<(value: string) => string>> = {
  simple: [toLower, toTitleCase, toUpper, identity],
  medium: [toLower, toUpper, toTitleCase, identity],
  hard: [toLower, toUpper, toTitleCase, identity],
}

/**
 * Separators used between terms
 */
const separators = ["", "_", "-", "."]

/**
 * Numbers to append/prepend by mode
 */
const numbersByMode: Record<GenerationMode, string[]> = {
  simple: ["1", "123"],
  medium: ["1", "2", "3", "12", "123", "2024", "2025"],
  hard: ["1", "2", "3", "123", "2023", "2024", "2025", "01", "00", "99"],
}

/**
 * Special characters to append/prepend by mode
 */
const specialCharsByMode: Record<GenerationMode, string[]> = {
  simple: ["!"],
  medium: ["!", "@", "#"],
  hard: ["!", "@", "#", "$", "*"],
}

/**
 * Separators used between terms and numbers
 */
const numberSeparatorsByMode: Record<GenerationMode, string[]> = {
  simple: ["", "-"],
  medium: separators,
  hard: separators,
}

/**
 * Mode labels for UI display
 */
const modeLabels: Record<GenerationMode, string> = {
  simple: "Simple",
  medium: "Medium",
  hard: "Hard",
}

/**
 * Mode descriptions for UI display
 */
const modeDescriptions: Record<GenerationMode, string> = {
  simple: "Essential variations with light combinations.",
  medium: "Balanced combinations with common additions.",
  hard: "Exhaustive exploration with all possible variations.",
}

/**
 * Generates all possible enumerations from input terms based on the selected mode
 * 
 * @param terms - Array of input terms to generate variations from
 * @param mode - Generation mode (simple, medium, hard)
 * @returns Array of unique enumeration strings
 */
function buildEnumerations(terms: string[], mode: GenerationMode) {
  const results = new Set<string>()
  if (terms.length === 0) {
    return []
  }

  const capitalizationTransforms = capitalizationsByMode[mode]
  const variantMap = new Map<string, string[]>()

  // Generate capitalization variants for each term
  terms.forEach((term) => {
    const variants = Array.from(new Set(capitalizationTransforms.map((transform) => transform(term))))
    variantMap.set(term, variants)
    variants.forEach((variant) => results.add(variant))
  })

  // Generate two-term combinations (medium and hard modes)
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

  // Generate three-term combinations (hard mode only)
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

  // Add number variations
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

  // Add special character variations
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

  // Add common patterns (medium and hard modes)
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

  // Add leet speak variations (hard mode only)
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

/**
 * EnumerationGenerator Component
 * 
 * Main component for generating username/password enumerations.
 * Allows users to input terms, select a generation mode, and generate
 * variations with different capitalizations, separators, and patterns.
 */
export function EnumerationGenerator() {
  const [terms, setTerms] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [generated, setGenerated] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [mode, setMode] = useState<GenerationMode>("hard")
  const [copySuccess, setCopySuccess] = useState(false)
  const [validationMessage, setValidationMessage] = useState<string>("")

  /**
   * Adds a new term to the list if it's not empty and not already present
   */
  const addTerm = () => {
    const trimmedInput = currentInput.trim()
    
    // Clear previous validation message
    setValidationMessage("")
    
    // Validate input
    if (!trimmedInput) {
      setValidationMessage("Please enter a term")
      return
    }
    
    // Check for duplicates (case-insensitive)
    if (terms.some(term => term.toLowerCase() === trimmedInput.toLowerCase())) {
      setValidationMessage("This term has already been added")
      return
    }
    
    // Limit number of terms to prevent performance issues
    if (terms.length >= 10) {
      setValidationMessage("Maximum of 10 terms allowed")
      return
    }
    
    setTerms([...terms, trimmedInput])
    setCurrentInput("")
  }

  /**
   * Removes a term from the list
   * @param term - The term to remove
   */
  const removeTerm = (term: string) => {
    setTerms(terms.filter((t) => t !== term))
  }

  /**
   * Generates enumerations based on current terms and mode
   */
  const generateEnumerations = () => {
    if (terms.length === 0) return

    setIsGenerating(true)

    // Use requestAnimationFrame to avoid blocking UI
    requestAnimationFrame(() => {
      try {
        const results = buildEnumerations(terms, mode).sort((a, b) => a.localeCompare(b))
        setGenerated(results)
      } catch (error) {
        console.error("Error generating enumerations:", error)
        setGenerated([])
      } finally {
        setIsGenerating(false)
      }
    })
  }

  /**
   * Downloads the generated enumerations as a text file
   */
  const downloadList = () => {
    try {
      if (generated.length === 0) return
      
      const blob = new Blob([generated.join("\n")], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `enumerations_${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }

  /**
   * Clears all input terms and generated results
   */
  const clearAll = () => {
    setTerms([])
    setGenerated([])
    setCurrentInput("")
    setValidationMessage("")
  }

  /**
   * Copies generated enumerations to clipboard
   */
  const copyToClipboard = async () => {
    try {
      if (generated.length === 0) return
      
      await navigator.clipboard.writeText(generated.join("\n"))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      // Provide user feedback for clipboard failure
      const fallbackMessage = "Copy failed. Please try selecting and copying the text manually."
      alert(fallbackMessage)
    }
  }

  return (
    <div id="generator" className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value)
                  setValidationMessage("") // Clear validation on change
                }}
                onKeyDown={(e) => e.key === "Enter" && addTerm()}
                placeholder="Enter term (e.g., john, admin, 2023)"
                className="flex-1 bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
                disabled={terms.length >= 10}
                maxLength={50}
              />
              <Button
                onClick={addTerm}
                variant="secondary"
                size="icon"
                className="bg-secondary hover:bg-accent text-secondary-foreground"
                disabled={!currentInput.trim() || terms.length >= 10}
                title={terms.length >= 10 ? "Maximum terms reached" : "Add term"}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {validationMessage && (
              <p className="text-xs text-destructive font-mono">{validationMessage}</p>
            )}
          </div>

          {terms.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-mono">
                  {terms.length} term{terms.length > 1 ? 's' : ''} added {terms.length >= 10 ? '(max reached)' : ''}
                </p>
                <Button
                  onClick={clearAll}
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {terms.map((term) => (
                  <div
                    key={term}
                    className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-md text-sm font-mono text-accent-foreground"
                  >
                    {term}
                    <button 
                      onClick={() => removeTerm(term)} 
                      className="hover:text-foreground transition-colors"
                      aria-label={`Remove ${term}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
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
              <DropdownMenuLabel>Generation Mode</DropdownMenuLabel>
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
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  size="sm"
                  className="bg-secondary hover:bg-accent text-secondary-foreground font-mono gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copySuccess ? "COPIED!" : "COPY"}
                </Button>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Download, Plus } from "lucide-react"

export function EnumerationGenerator() {
  const [terms, setTerms] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [generated, setGenerated] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

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
      const results = new Set<string>()
      const separators = ["", "_", "-", "."]
      const capitalizations = [
        (s: string) => s.toLowerCase(),
        (s: string) => s.toUpperCase(),
        (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
        (s: string) => s,
      ]

      // Single terms with variations
      terms.forEach((term) => {
        capitalizations.forEach((cap) => {
          results.add(cap(term))
        })
      })

      // Two-term combinations
      for (let i = 0; i < terms.length; i++) {
        for (let j = 0; j < terms.length; j++) {
          if (i !== j) {
            separators.forEach((sep) => {
              capitalizations.forEach((cap1) => {
                capitalizations.forEach((cap2) => {
                  results.add(`${cap1(terms[i])}${sep}${cap2(terms[j])}`)
                })
              })
            })
          }
        }
      }

      // Three-term combinations
      if (terms.length >= 3) {
        for (let i = 0; i < terms.length; i++) {
          for (let j = 0; j < terms.length; j++) {
            for (let k = 0; k < terms.length; k++) {
              if (i !== j && j !== k && i !== k) {
                separators.forEach((sep1) => {
                  separators.forEach((sep2) => {
                    capitalizations.forEach((cap1) => {
                      capitalizations.forEach((cap2) => {
                        capitalizations.forEach((cap3) => {
                          results.add(`${cap1(terms[i])}${sep1}${cap2(terms[j])}${sep2}${cap3(terms[k])}`)
                        })
                      })
                    })
                  })
                })
              }
            }
          }
        }
      }

      // Numeric suffixes and prefixes
      const numbers = ["1", "2", "3", "123", "2023", "2024", "2025", "01", "00", "99"]
      terms.forEach((term) => {
        numbers.forEach((num) => {
          separators.forEach((sep) => {
            capitalizations.forEach((cap) => {
              results.add(`${cap(term)}${sep}${num}`)
              results.add(`${num}${sep}${cap(term)}`)
            })
          })
        })
      })

      // Special character variations
      const specialChars = ["!", "@", "#", "$", "*"]
      terms.forEach((term) => {
        specialChars.forEach((char) => {
          capitalizations.forEach((cap) => {
            results.add(`${cap(term)}${char}`)
            results.add(`${char}${cap(term)}`)
          })
        })
      })

      // Leet speak variations
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

      // Common patterns
      terms.forEach((term) => {
        results.add(`${term}123`)
        results.add(`${term}!`)
        results.add(`${term}@123`)
        results.add(`admin${term}`)
        results.add(`${term}admin`)
        results.add(`user${term}`)
        results.add(`${term}user`)
      })

      setGenerated(Array.from(results).sort())
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
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

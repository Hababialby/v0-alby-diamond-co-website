"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Download } from "lucide-react"

interface AIDesignGeneratorProps {
  itemTitle: string
  itemCategory: string
}

export function AIDesignGenerator({ itemTitle, itemCategory }: AIDesignGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a design description")
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          itemTitle,
          itemCategory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate design")
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (err) {
      console.error("[v0] Error generating design:", err)
      setError(err instanceof Error ? err.message : "Failed to generate design. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = `custom-design-${Date.now()}.png`
      link.click()
    }
  }

  return (
    <div className="border border-border bg-background/50 p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-accent/10 border border-accent/20">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Custom Design Generator</h3>
          <p className="text-sm text-muted-foreground">Describe your dream piece and see it come to life</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="design-prompt">Your Custom Design Idea</Label>
          <Textarea
            id="design-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A rose gold engagement ring with a cushion-cut diamond surrounded by a halo of smaller diamonds, with intricate filigree on the band..."
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Be specific about metal type, stone shape, setting style, and any special details you envision.
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3">{error}</div>
        )}

        <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Design...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Custom Design
            </>
          )}
        </Button>

        {generatedImage && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="relative aspect-square overflow-hidden bg-muted border border-border">
              <img
                src={generatedImage || "/placeholder.svg"}
                alt="AI Generated Custom Design"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleDownload} variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Design
              </Button>
              <Button onClick={() => setPrompt("")} variant="outline" className="flex-1">
                Create Another
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Love this design? Contact us to bring it to life or use it as inspiration for your custom piece.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

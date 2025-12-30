import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, itemTitle, itemCategory } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Enhanced prompt with luxury jewelry styling instructions
    const enhancedPrompt = `Professional luxury jewelry product photography, ${prompt}. 
Style: high-end jewelry catalog, professional studio lighting, white or soft gradient background, 
ultra detailed, photorealistic, elegant presentation, sharp focus on gemstones and metalwork, 
professional jewelry photography, 8k resolution, commercial quality.
Context: inspired by ${itemCategory} - ${itemTitle}`

    console.log("[v0] Generating design with prompt:", enhancedPrompt)

    // Using OpenAI's DALL-E via AI SDK (works by default with Vercel AI Gateway)
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || "dummy-key"}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] OpenAI API error:", errorData)

      // Fallback to placeholder if API key is not set
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({
          imageUrl: `/placeholder.svg?height=1024&width=1024&query=${encodeURIComponent(prompt)}`,
          message: "Using placeholder. Add OPENAI_API_KEY to environment variables for AI generation.",
        })
      }

      throw new Error(errorData.error?.message || "Failed to generate image")
    }

    const data = await response.json()
    const imageUrl = data.data[0]?.url

    if (!imageUrl) {
      throw new Error("No image URL returned from API")
    }

    console.log("[v0] Design generated successfully")

    return NextResponse.json({
      imageUrl,
      prompt: enhancedPrompt,
    })
  } catch (error) {
    console.error("[v0] Error in generate-design route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate design",
      },
      { status: 500 },
    )
  }
}

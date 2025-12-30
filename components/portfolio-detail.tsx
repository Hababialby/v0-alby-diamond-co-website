"use client"

import type React from "react"

import { useState } from "react"
import type { PortfolioItem } from "@/lib/portfolio-data"
import { ArrowLeft, Quote, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { AIDesignGenerator } from "@/components/ai-design-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface PortfolioDetailProps {
  item: PortfolioItem
}

export function PortfolioDetail({ item }: PortfolioDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const attachmentData = await Promise.all(
        attachments.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              const base64String = reader.result as string
              // Remove the data URL prefix (e.g., "data:image/png;base64,")
              const base64Content = base64String.split(",")[1]
              resolve({
                filename: file.name,
                content: base64Content,
                type: file.type,
              })
            }
            reader.onerror = () => {
              resolve(null)
            }
            reader.readAsDataURL(file)
          })
        }),
      )

      // Filter out any null values from failed reads
      const validAttachments = attachmentData.filter((att) => att !== null)

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product: item.title,
          category: item.category,
          attachments: validAttachments,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitSuccess(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
      setAttachments([])
    } catch (error) {
      setSubmitError("Something went wrong. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToAIDesign = () => {
    const aiSection = document.getElementById("ai-design-section")
    aiSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden bg-muted border border-border">
            <img
              src={item.images[selectedImage] || "/placeholder.svg"}
              alt={`${item.title} - Image ${selectedImage + 1}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {item.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden bg-muted border-2 transition-all ${
                  selectedImage === index ? "border-accent" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${item.title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.category}</p>
            <h1 className="text-3xl font-light tracking-tight text-foreground mb-4 text-balance">{item.title}</h1>
            <div className="relative bg-background/50 border-l-4 border-accent pl-6 py-3 mt-4">
              <Quote className="absolute -top-2 -left-3 h-8 w-8 text-accent/20" />
              <blockquote className="text-base text-foreground/80 italic leading-relaxed mb-3">
                "{item.customerQuote}"
              </blockquote>
              <p className="text-sm text-muted-foreground">— {item.customerName}</p>
            </div>
          </div>

          {submitSuccess ? (
            <div className="space-y-6 bg-background/30 border border-accent p-8 rounded-lg text-center">
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto" />
              <div className="space-y-2">
                <h3 className="text-2xl font-light text-foreground">Message Received!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you for your interest. We've received your message, and a member of our team will reach out to
                  you as soon as possible.
                </p>
                <p className="text-sm text-muted-foreground pt-4">
                  You should also receive a confirmation email shortly.
                </p>
              </div>
              <Button onClick={() => setSubmitSuccess(false)} variant="outline" className="bg-transparent">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-background/30 border border-border p-6 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-background resize-none"
                  required={false}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">
                  Attachments <span className="text-muted-foreground text-xs">(optional)</span>
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      className="bg-background"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setAttachments(files)
                      }}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    {attachments.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {attachments.length} file{attachments.length !== 1 ? "s" : ""} selected
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={scrollToAIDesign}
                    className="whitespace-nowrap bg-transparent"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Design with AI
                  </Button>
                </div>
              </div>

              {submitError && (
                <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded text-sm">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Contact Me"}
              </Button>
            </form>
          )}
        </div>
      </div>

      <div id="ai-design-section" className="mt-12 scroll-mt-8">
        <AIDesignGenerator itemTitle={item.title} itemCategory={item.category} />
      </div>
    </div>
  )
}

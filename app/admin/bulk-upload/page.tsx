"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, X, FolderOpen } from "lucide-react"

const CATEGORIES = ["Engagement Rings", "Wedding Bands", "Necklaces", "Bracelets", "Earrings", "Statement Rings"]

interface UploadItem {
  id: string
  folderName: string
  files: File[]
  title: string
  category: string
  customerQuote: string
  customerName: string
  status: "pending" | "uploading" | "success" | "error"
  errorMessage?: string
}

export default function BulkUploadPage() {
  const router = useRouter()
  const [items, setItems] = useState<UploadItem[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const addFolderImages = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)

    // Group files by their folder path
    const groups: Record<string, File[]> = {}

    fileArray.forEach((file) => {
      // Get the folder name from the file's path
      const filePath = (file as any).webkitRelativePath || file.name
      const pathParts = filePath.split("/")
      const folderName = pathParts.length > 1 ? pathParts[0] : "Uncategorized"

      if (!groups[folderName]) {
        groups[folderName] = []
      }
      groups[folderName].push(file)
    })

    // Create an item for each folder
    const newItems: UploadItem[] = Object.entries(groups).map(([folderName, files], index) => {
      const titleWords = folderName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        id: `item-${Date.now()}-${index}`,
        folderName,
        files: files.sort((a, b) => a.name.localeCompare(b.name)),
        title: titleWords,
        category: "Engagement Rings",
        customerQuote: "",
        customerName: "",
        status: "pending" as const,
      }
    })

    setItems([...items, ...newItems])
  }

  const updateItem = (id: string, updates: Partial<UploadItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const removeFileFromItem = (itemId: string, fileIndex: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, files: item.files.filter((_, idx) => idx !== fileIndex) } : item,
      ),
    )
  }

  const uploadAll = async () => {
    setIsUploading(true)

    for (const item of items) {
      if (item.status === "success") continue
      if (item.files.length === 0) continue

      updateItem(item.id, { status: "uploading" })

      try {
        // Upload images to Vercel Blob
        const uploadPromises = item.files.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) throw new Error("Upload failed")

          const { url } = await response.json()
          return url
        })

        const imageUrls = await Promise.all(uploadPromises)

        // Create portfolio item
        const response = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: item.title,
            category: item.category,
            customerQuote: item.customerQuote,
            customerName: item.customerName,
            images: imageUrls,
          }),
        })

        if (!response.ok) throw new Error("Failed to create portfolio item")

        updateItem(item.id, { status: "success" })
      } catch (error) {
        updateItem(item.id, {
          status: "error",
          errorMessage: error instanceof Error ? error.message : "Upload failed",
        })
      }
    }

    setIsUploading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/portfolio")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-semibold text-foreground">Bulk Upload Jewelry Portfolio</h1>
          </div>
          {items.length > 0 && (
            <Button onClick={uploadAll} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload All to Vercel Blob"}
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 mb-2">How to organize your photos:</p>
          <ul className="text-sm text-blue-800 space-y-1 ml-4">
            <li>✓ Create folders for each jewelry item (e.g., "Diamond Ring", "Halo Ring", "Pearl Necklace")</li>
            <li>✓ Place all photos for that item inside its folder (2-6 photos recommended)</li>
            <li>✓ Select the parent folder and upload - we'll group everything automatically</li>
            <li>✓ Edit titles, categories, and add customer testimonials before uploading</li>
          </ul>
        </div>

        {/* Upload Area */}
        <div className="mb-8 border-2 border-dashed border-border rounded-lg p-8 text-center bg-white">
          <input
            type="file"
            id="folder-upload"
            // @ts-ignore - webkitdirectory is a valid HTML5 attribute
            webkitdirectory
            mozdirectory="true"
            onChange={(e) => addFolderImages(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="folder-upload"
            className={`cursor-pointer inline-flex flex-col items-center gap-3 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground">Select a folder with item subfolders</p>
              <p className="text-sm text-muted-foreground mt-1">
                Each subfolder becomes one portfolio item with all its photos
              </p>
            </div>
          </label>
        </div>

        {/* Items List */}
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-start gap-6">
                {/* Image Previews */}
                <div className="flex-shrink-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.files.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Preview ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded border border-border"
                          title={file.name}
                        />
                        <button
                          onClick={() => removeFileFromItem(item.id, idx)}
                          disabled={isUploading || item.status === "success"}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{item.files.length} photos</p>
                  <p className="text-xs text-muted-foreground">From: {item.folderName}</p>
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => updateItem(item.id, { title: e.target.value })}
                      disabled={isUploading || item.status === "success"}
                      placeholder="e.g., Platinum Solitaire Ring"
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateItem(item.id, { category: value })}
                      disabled={isUploading || item.status === "success"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={item.customerName}
                      onChange={(e) => updateItem(item.id, { customerName: e.target.value })}
                      placeholder="e.g., Sarah M."
                      disabled={isUploading || item.status === "success"}
                    />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2 h-9">
                      {item.status === "pending" && (
                        <span className="text-sm text-muted-foreground">Ready to upload</span>
                      )}
                      {item.status === "uploading" && <span className="text-sm text-blue-600">Uploading...</span>}
                      {item.status === "success" && <span className="text-sm text-green-600">✓ Uploaded to Blob</span>}
                      {item.status === "error" && <span className="text-sm text-red-600">✗ {item.errorMessage}</span>}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <Label>Customer Quote/Testimonial</Label>
                    <Textarea
                      value={item.customerQuote}
                      onChange={(e) => updateItem(item.id, { customerQuote: e.target.value })}
                      placeholder="What did your customer say about this piece?"
                      rows={2}
                      disabled={isUploading || item.status === "success"}
                    />
                  </div>
                </div>

                {/* Remove Button */}
                {item.status !== "success" && (
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} disabled={isUploading}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No folders selected. Choose your folder to organize your portfolio items.</p>
          </div>
        )}
      </div>
    </div>
  )
}

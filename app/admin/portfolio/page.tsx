"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  category: string
  customer_quote: string | null
  customer_name: string | null
  images: string[]
  created_at: string
}

const CATEGORIES = ["Engagement Rings", "Wedding Bands", "Necklaces", "Bracelets", "Earrings", "Statement Rings"]

export default function PortfolioManager() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [customerQuote, setCustomerQuote] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth")
    if (auth === "authenticated") {
      setIsAuthenticated(true)
      fetchItems()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "2+2") {
      sessionStorage.setItem("admin_auth", "authenticated")
      setIsAuthenticated(true)
      fetchItems()
    } else {
      alert("Incorrect password")
    }
  }

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/portfolio")
      const data = await response.json()
      setItems(data.items || [])
    } catch (error) {
      console.error("Error fetching items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)

    const oversizedFiles = fileArray.filter((file) => file.size > 2 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert(`${oversizedFiles.length} image(s) are too large. Please use images under 2MB for optimal performance.`)
      return
    }

    if (images.length + fileArray.length > 6) {
      alert("Maximum 6 images per portfolio item for optimal loading speed.")
      return
    }

    setIsUploading(true)
    try {
      // Upload each file to Vercel Blob
      const uploadPromises = fileArray.map(async (file) => {
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

      const uploadedUrls = await Promise.all(uploadPromises)
      setImages([...images, ...uploadedUrls])
      setImageFiles([...imageFiles, ...fileArray])
    } catch (error) {
      console.error("Image upload error:", error)
      alert("Failed to upload images. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setTitle("")
    setCategory("")
    setCustomerQuote("")
    setCustomerName("")
    setImages([])
    setImageFiles([])
    setEditingItem(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        id: editingItem?.id,
        title,
        category,
        customerQuote,
        customerName,
        images,
      }

      const response = await fetch("/api/admin/portfolio", {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save item")

      await fetchItems()
      resetForm()
    } catch (error) {
      console.error("Error saving item:", error)
      alert("Failed to save portfolio item")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setTitle(item.title)
    setCategory(item.category)
    setCustomerQuote(item.customer_quote || "")
    setCustomerName(item.customer_name || "")
    setImages(item.images || [])
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete item")

      await fetchItems()
    } catch (error) {
      console.error("Error deleting item:", error)
      alert("Failed to delete portfolio item")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-border rounded-lg p-8">
            <h1 className="text-2xl font-semibold text-foreground mb-6">Portfolio Manager</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-semibold text-foreground">Portfolio Manager</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push("/admin/bulk-upload")}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload Photos
            </Button>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Portfolio Item
              </Button>
            )}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="customerName">Customer Name (optional)</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Sarah M."
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="customerQuote">Customer Testimonial (optional)</Label>
                  <Textarea
                    id="customerQuote"
                    value={customerQuote}
                    onChange={(e) => setCustomerQuote(e.target.value)}
                    rows={3}
                    placeholder="Customer's feedback about the piece..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label>Images</Label>
                <div className="mt-2 space-y-4">
                  {/* Upload Button */}
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer inline-flex items-center gap-2 text-muted-foreground hover:text-foreground ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Upload className="h-5 w-5" />
                      <span>{isUploading ? "Uploading..." : "Click to upload images"}</span>
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload up to 6 images per item. Recommended: Under 2MB each for fast loading
                    </p>
                  </div>

                  {/* Image Preview */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg border border-border"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isUploading}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading || isUploading}>
                  {isLoading ? "Saving..." : editingItem ? "Update Item" : "Create Item"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading || isUploading}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Portfolio Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-lg overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 bg-muted">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                )}
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-accent mb-1">{item.category}</p>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.customer_name && <p className="text-sm text-muted-foreground">{item.customer_name}</p>}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No portfolio items yet. Add your first item to get started.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio Item
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

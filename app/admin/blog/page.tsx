"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  read_time: string
  published: boolean
  created_at: string
}

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    image: "",
    published: false,
  })
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please use an image under 2MB for optimal performance.")
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const { url } = await response.json()
      setFormData((prev) => ({ ...prev, image: url }))
    } catch (error) {
      console.error("Image upload error:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const read_time = calculateReadTime(formData.content)
    const postData = { ...formData, read_time }

    try {
      if (editingPost) {
        await fetch("/api/admin/blog", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPost.id, ...postData }),
        })
      } else {
        await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      }

      resetForm()
      loadPosts()
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Failed to save post")
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      image: post.image,
      published: post.published,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      })
      loadPosts()
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      image: "",
      published: false,
    })
    setEditingPost(null)
    setShowForm(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading blog posts...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-accent hover:text-accent/80 mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-semibold text-foreground">Blog Manager</h1>
            <p className="text-muted-foreground mt-1">Create and manage blog posts</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-accent hover:bg-accent/90 text-white">
            {showForm ? "Cancel" : "+ New Post"}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Author *</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Education, Trends, Care & Maintenance"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Date *</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Excerpt *</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief summary of the post (1-2 sentences)"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Content *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full blog post content"
                  rows={12}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Read time: {calculateReadTime(formData.content)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Featured Image *</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!editingPost}
                  disabled={isUploading}
                />
                {isUploading && <p className="text-xs text-accent mt-1">Uploading image...</p>}
                <p className="text-xs text-muted-foreground mt-1">Recommended: Under 2MB for fast loading</p>
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm text-foreground">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-white">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Author</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No blog posts yet. Create your first post to get started.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{post.title}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{post.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{post.author}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            post.published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(post)} className="text-accent hover:text-accent/80">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

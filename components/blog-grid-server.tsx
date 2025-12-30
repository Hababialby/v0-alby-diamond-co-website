"use client"

import { useState } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
  slug: string
  published: boolean
  created_at: string
}

interface BlogGridServerProps {
  posts: BlogPost[]
}

export function BlogGridServer({ posts }: BlogGridServerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))]

  const filteredPosts = selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No blog posts yet. Create your first post in the admin panel!
          </div>
        )}
      </div>
    </div>
  )
}

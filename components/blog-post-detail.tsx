"use client"

import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  read_time: string
  published: boolean
  created_at: string
}

interface BlogPostDetailProps {
  post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{post.category}</p>
        <h1 className="text-4xl font-light tracking-tight text-foreground mb-6 text-balance">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(post.date || post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.read_time || "5 min read"}</span>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden bg-muted mb-8">
          <Image
            src={post.image || "/placeholder.svg?height=600&width=1200&query=diamond+jewelry+blog"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

        <div className="text-foreground leading-relaxed space-y-4">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">Share this article with others who might find it helpful.</p>
      </div>
    </article>
  )
}

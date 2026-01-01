"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

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

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="group overflow-hidden border border-border transition-all hover:shadow-lg">
        <div className="relative aspect-[2/1] overflow-hidden bg-muted">
          <Image
            src={post.image || "/placeholder.svg?height=400&width=800&query=diamond+jewelry+blog"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{post.category}</p>
          <h3 className="text-xl font-semibold text-card-foreground mb-3 text-balance">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(post.date || post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.read_time || "5 min read"}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

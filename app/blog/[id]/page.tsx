import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { parseMarkdown } from "@/lib/markdown"

export const revalidate = 60

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="text-sm font-medium text-primary">{post.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm border-t border-b border-border py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{post.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <time className="text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{post.read_time}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative aspect-[2/1] mb-12 overflow-hidden rounded-lg">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-strong:font-semibold prose-strong:text-foreground prose-p:text-foreground/90 prose-p:leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from("blog_posts").select("id").eq("published", true)

  return (
    posts?.map((post) => ({
      id: post.id,
    })) || []
  )
}

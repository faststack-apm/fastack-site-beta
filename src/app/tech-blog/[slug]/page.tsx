"use client";

import { use } from "react";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { TECH_BLOG_POSTS } from "@/lib/tech-blog-data";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export default function TechBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = TECH_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <FadeInSection delay={100}>
          <Link
            href="/tech-blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors mb-12 group/back w-fit"
          >
            <ChevronLeft className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </FadeInSection>

        <article className="space-y-12">
          <header className="space-y-6">
            <FadeInSection delay={200}>
              <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
                <span>{post.category}</span>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {post.title}
              </h1>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-white/5 py-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </FadeInSection>
          </header>

          <FadeInSection delay={500}>
            <div className="glass-panel p-8 md:p-12">
              <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-lg">
                {post.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();

                  if (trimmed.startsWith('# ')) return <h1 key={i} className="text-3xl mt-8 mb-4 font-bold">{trimmed.substring(2)}</h1>;
                  if (trimmed.startsWith('## ')) return <h2 key={i} className="text-2xl mt-8 mb-4 font-bold text-foreground">{trimmed.substring(3)}</h2>;
                  if (trimmed === '') return <br key={i} />;
                  return <p key={i} className="mb-4">{line}</p>;
                })}
              </div>
            </div>
          </FadeInSection>
        </article>
      </div>
    </main>
  );
}

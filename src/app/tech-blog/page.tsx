"use client";

import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { TECH_BLOG_POSTS } from "@/lib/tech-blog-data";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function TechBlogListingPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto z-10 relative">
        <div className="space-y-4 mb-16">
          <FadeInSection delay={200}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Tech <span className="text-gradient">Journal</span>
            </h1>
          </FadeInSection>
          <FadeInSection delay={300}>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Personal notes on building, shipping, and everything in between.
            </p>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_BLOG_POSTS.map((post, index) => (
            <FadeInSection key={post.slug} delay={400 + index * 100}>
              <Link
                href={`/tech-blog/${post.slug}`}
                className="glass-panel p-8 flex flex-col h-full group hover:border-blue-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <span>{post.category}</span>
                  </div>

                  <h2 className="text-2xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-foreground transition-all group-hover:gap-4">
                    Read Article
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </main>
  );
}

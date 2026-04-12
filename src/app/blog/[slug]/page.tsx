"use client";

import { use, useState } from "react";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ChevronLeft, Calendar, Clock, Share2, Printer, Play } from "lucide-react";
import { notFound } from "next/navigation";
import { VideoModal, type VideoContent } from "@/components/VideoModal/VideoModal";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoContent | null>(null);

  if (!post) {
    notFound();
  }

  const handleOpenVideo = (title: string, url: string) => {
    setCurrentVideo({ title, url });
    setIsVideoModalOpen(true);
  };

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <FadeInSection delay={100}>
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors mb-12 group/back w-fit"
          >
            <ChevronLeft className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform" />
            Back to Blog
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
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  By Fast Stack Team
                </div>
                
                <div className="flex-1" />
                
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:text-blue-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:text-blue-400 transition-colors">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          </header>

          <FadeInSection delay={500}>
            <div className="glass-panel p-8 md:p-12">
              <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-lg">
                {post.content.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  
                  // Headings
                  if (trimmed.startsWith('# ')) return <h1 key={i} className="text-3xl mt-8 mb-4 font-bold">{trimmed.substring(2)}</h1>;
                  if (trimmed.startsWith('## ')) return <h2 key={i} className="text-2xl mt-8 mb-4 font-bold text-foreground">{trimmed.substring(3)}</h2>;
                  
                  // Video CTA Tag: [VIDEO_CTA:title:videoUrl:thumbUrl]
                  if (trimmed.startsWith('[VIDEO_CTA:')) {
                    const parts = trimmed.substring(11, trimmed.length - 1).split(':');
                    if (parts.length >= 3) {
                      const [title, videoUrl, thumbUrl] = parts;
                      return (
                        <div key={i} className="my-10 group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-blue-400/30">
                          <div className="relative aspect-video w-full overflow-hidden">
                            {/* Metadata about "thumbUrl" as image source */}
                            <img 
                              src={thumbUrl} 
                              alt={title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                              <button 
                                onClick={() => handleOpenVideo(title, videoUrl)}
                                className="w-20 h-20 rounded-full bg-blue-500/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-110 hover:bg-blue-400 active:scale-95"
                              >
                                <Play className="w-8 h-8 fill-current ml-1" />
                              </button>
                            </div>
                          </div>
                          <div className="p-6 flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-bold text-foreground">Launch Product Demo</h4>
                              <p className="text-sm text-muted-foreground">{title}</p>
                            </div>
                            <button 
                              onClick={() => handleOpenVideo(title, videoUrl)}
                              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-400/20 rounded-lg hover:bg-blue-400/10 transition-all"
                            >
                              Watch Video
                            </button>
                          </div>
                        </div>
                      );
                    }
                  }

                  if (trimmed === '') return <br key={i} />;
                  return <p key={i} className="mb-4">{line}</p>;
                })}
              </div>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={600}>
            <div className="mt-20 p-12 glass-panel border-blue-400/20 text-center space-y-6">
              <h3 className="text-2xl font-bold">Ready to see it in action?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Join our Alpha program and be among the first to experience the data-driven future of Fast Stack.
              </p>
              <Link 
                href="/#newsletter"
                className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                Join the Alpha
              </Link>
            </div>
          </FadeInSection>
        </article>
      </div>

      <VideoModal 
        isOpen={isVideoModalOpen}
        video={currentVideo}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </main>
  );
}

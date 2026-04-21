"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { ChevronLeft, Calendar, Clock, Share2, Printer, Play } from "lucide-react";
import { VideoModal, type VideoContent } from "@/components/VideoModal/VideoModal";
import { ImageModal, type ModalImage } from "@/components/ImageModal/ImageModal";
import { CodeSnippet } from "@/components/CodeSnippet/CodeSnippet";
import { type BlogPost } from "@/lib/blog-loader";
import { BlogFooter } from "@/components/Blog/BlogFooter";

interface PostClientProps {
  post: BlogPost;
  backUrl: string;
  backLabel: string;
}

export default function PostClient({ post, backUrl, backLabel }: PostClientProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoContent | null>(null);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ModalImage | null>(null);

  const handleOpenVideo = (title: string, url: string, description?: string) => {
    setCurrentVideo({ title, url, description });
    setIsVideoModalOpen(true);
  };

  const handleOpenImage = (title: string, src: string, alt: string, description?: string) => {
    setCurrentImage({ title, src, alt, description });
    setIsImageModalOpen(true);
  };

  const renderContent = (content: string) => {
    if (!content || typeof content !== 'string') return null;
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === '') {
        elements.push(<br key={`br-${i}`} />);
        i++;
        continue;
      }

      // Headers
      if (trimmed.startsWith('#### ')) {
        elements.push(<h4 key={i} className="text-lg mt-6 mb-3 font-bold text-foreground">{trimmed.substring(5)}</h4>);
        i++; continue;
      }
      if (trimmed.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-xl mt-8 mb-4 font-bold text-foreground">{trimmed.substring(4)}</h3>);
        i++; continue;
      }
      if (trimmed.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl mt-10 mb-5 font-bold text-foreground">{trimmed.substring(3)}</h2>);
        i++; continue;
      }
      if (trimmed.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-3xl mt-12 mb-6 font-bold">{trimmed.substring(2)}</h1>);
        i++; continue;
      }

      // Code Block: [code: title] ... [/code]
      if (trimmed.startsWith('[code')) {
        const titleMatch = trimmed.match(/\[code:\s*(.*?)\]/i);
        const title = titleMatch ? titleMatch[1] : '';
        let codeLines = [];
        i++; // skip opening tag
        while (i < lines.length && !lines[i].trim().startsWith('[/code]')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing tag
        elements.push(
          <div key={i} className="my-8 space-y-2">
            {title && <div className="text-sm font-mono text-blue-400/80 px-2">{title}</div>}
            <CodeSnippet srcCode={codeLines.join('\n')} />
          </div>
        );
        continue;
      }

      // Media Tags: [title || description || path] or [title || path]
      const mediaTagRegex = /\[(.*?)\]/g;
      const matches = [...trimmed.matchAll(mediaTagRegex)];

      // Media Tags: Group consecutive lines containing media tags
      if (matches.length > 0 && (trimmed.includes('||') || trimmed.startsWith('[VIDEO_CTA:'))) {
        const mediaGroup = [];
        let j = i;
        
        // Look ahead to group consecutive lines with media tags
        while (j < lines.length) {
          const nextLine = lines[j].trim();
          if (nextLine === '') {
            // Allow single empty lines between consecutive media blocks for grouping
            const followUpLine = lines[j+1]?.trim() || '';
            const followUpMatches = [...followUpLine.matchAll(mediaTagRegex)];
            if (followUpMatches.length > 0 && (followUpLine.includes('||') || followUpLine.startsWith('[VIDEO_CTA:'))) {
              j++;
              continue;
            }
            break;
          }
          
          const nextMatches = [...nextLine.matchAll(mediaTagRegex)];
          if (nextMatches.length > 0 && (nextLine.includes('||') || nextLine.startsWith('[VIDEO_CTA:'))) {
            nextMatches.forEach((match, idx) => {
              const rawTag = match[1];
              let title = '';
              let description = '';
              let path = '';
              let type: 'video' | 'image' = 'image';

              if (rawTag.startsWith('VIDEO_CTA:')) {
                const parts = rawTag.substring(10).split(':');
                title = parts[0];
                path = parts[1];
                const thumb = parts[2] || '/image-placeholder.png';
                mediaGroup.push(renderMediaBlock(title, '', path, thumb, 'video', `media-${j}-${idx}`));
              } else if (rawTag.includes('||')) {
                const parts = rawTag.split('||').map(p => p.trim());
                if (parts.length >= 2) {
                  let title = '', description = '', path = '', thumb = '';
                  
                  if (parts.length === 4) {
                    [title, description, thumb, path] = parts;
                  } else if (parts.length === 3) {
                    [title, description, path] = parts;
                    // Support [title || thumb || video] for backward compatibility with onboarding demo
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(path);
                    const isImg = /\.(png|jpg|jpeg|webp)$/i.test(description);
                    if (isVideo && isImg) {
                      thumb = description;
                      description = ''; // Use the middle part as thumbnail
                    }
                  } else {
                    [title, path] = parts;
                  }

                  const isVideo = /\.(mp4|webm|ogg)$/i.test(path);
                  const type: 'video' | 'image' = isVideo ? 'video' : 'image';
                  
                  if (type === 'image') {
                    thumb = path;
                  } else if (!thumb) {
                    thumb = '/video-placeholder.png';
                  }

                  mediaGroup.push(renderMediaBlock(title, description, path, thumb, type, `media-${j}-${idx}`));
                }
              }
            });
            j++;
          } else {
            break;
          }
        }

        if (mediaGroup.length > 0) {
          const isSingle = mediaGroup.length === 1;
          const isOdd = mediaGroup.length % 2 !== 0;
          const gridClass = isSingle ? 'max-w-xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-6';

          elements.push(
            <div key={i} className={`my-8 ${gridClass}`}>
              {mediaGroup.map((item, idx) => {
                const isLastItem = idx === mediaGroup.length - 1;
                if (!isSingle && isOdd && isLastItem) {
                  return (
                    <div key={idx} className="md:col-span-2 flex justify-center">
                      <div className="w-full md:w-[calc(50%-12px)]">
                        {item}
                      </div>
                    </div>
                  );
                }
                return item;
              })}
            </div>
          );
          i = j;
          continue;
        }
      }

      // Default paragraph
      elements.push(<p key={i} className="mb-4 text-muted-foreground leading-relaxed">{line}</p>);
      i++;
    }

    return elements;
  };

  const renderMediaBlock = (title: string, description: string, path: string, thumb: string, type: 'video' | 'image', key: string) => {
    return (
      <div key={key} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-blue-400/30">
        <div className="relative aspect-video w-full overflow-hidden">
          <img 
            src={thumb} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
            <button 
              onClick={() => type === 'video' ? handleOpenVideo(title, path, description) : handleOpenImage(title, path, title, description)}
              className="w-12 h-12 rounded-full bg-blue-500/90 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all hover:scale-110 hover:bg-blue-400 active:scale-95"
            >
              {type === 'video' ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <Play className="w-5 h-5 opacity-80" />}
            </button>
          </div>
        </div>
        <div className="px-3 py-2.5 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-foreground/90 line-clamp-1 truncate">{title}</h4>
          </div>
          <button 
            onClick={() => type === 'video' ? handleOpenVideo(title, path, description) : handleOpenImage(title, path, title, description)}
            className="px-2 py-1 text-[10px] font-bold uppercase tracking-tight text-blue-400/80 border border-blue-400/20 rounded hover:bg-blue-400/10 transition-all whitespace-nowrap"
          >
            View
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <FadeInSection delay={100}>
          <Link 
            href={backUrl} 
            className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors mb-12 group/back w-fit"
          >
            <ChevronLeft className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform" />
            {backLabel}
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
                {renderContent(post.content)}
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

      <ImageModal
        isOpen={isImageModalOpen}
        image={currentImage}
        onClose={() => setIsImageModalOpen(false)}
      />
      <BlogFooter />
    </main>
  );
}

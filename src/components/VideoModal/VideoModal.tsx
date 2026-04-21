"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export interface VideoContent {
    url: string;
    title?: string;
    description?: string;
}

interface VideoModalProps {
    isOpen: boolean;
    video: VideoContent | null;
    onClose: () => void;
}

export function VideoModal({ isOpen, video, onClose }: VideoModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !video) return null;

    // Determine if it's a YouTube URL and convert to embed format
    const getEmbedUrl = (url: string) => {
        // YouTube URL patterns
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const match = url.match(youtubeRegex);

        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
        }

        // If it's already an embed URL or other video URL, return as is
        return url;
    };

    const embedUrl = getEmbedUrl(video.url);
    const isYouTube = embedUrl.includes("youtube.com/embed");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full h-full max-w-5xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Close modal"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Video Container */}
                <div className="flex-1 flex items-center justify-center overflow-auto">
                    {isYouTube ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            title={video.title || "Video"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    ) : (
                        <video
                            src={video.url}
                            controls
                            autoPlay
                            className="max-w-full max-h-full object-contain"
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                {/* Caption/Description */}
                {(video.title || video.description) && (
                    <div className="bg-black/60 backdrop-blur-sm px-6 py-3 text-white text-center border-t border-white/10">
                        {video.title && <h3 className="font-semibold">{video.title}</h3>}
                        {video.description && (
                            <p className="text-sm text-white/70 mt-1 max-w-2xl mx-auto">
                                {video.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

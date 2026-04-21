"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export interface ModalImage {
    src: string;
    alt: string;
    title?: string;
    description?: string;
}

interface ImageModalProps {
    isOpen: boolean;
    image: ModalImage | null;
    onClose: () => void;
}

export function ImageModal({ isOpen, image, onClose }: ImageModalProps) {
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

    if (!isOpen || !image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Image Container */}
                <div className="flex-1 flex items-center justify-center overflow-auto">
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* Caption/Description */}
                {(image.title || image.description) && (
                    <div className="bg-black/40 backdrop-blur-sm px-6 py-3 text-white text-center">
                        {image.title && <h3 className="font-semibold">{image.title}</h3>}
                        {image.description && (
                            <p className="text-sm text-white/70 mt-1 max-w-2xl mx-auto">
                                {image.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

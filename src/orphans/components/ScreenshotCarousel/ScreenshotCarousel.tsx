import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselImage {
    id: string;
    title: string;
    src: string;
    alt: string;
}

export interface ModalImage extends CarouselImage { }

interface ScreenshotCarouselProps {
    images: CarouselImage[];
    onImageClick?: (image: CarouselImage) => void;
    showTitles?: boolean;
}

export function ScreenshotCarousel({
    images,
    onImageClick,
    showTitles = true,
}: ScreenshotCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="w-full aspect-video bg-muted/10 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No screenshots available</p>
            </div>
        );
    }

    const currentImage = images[currentIndex];

    const goToSlide = (index: number) => {
        setCurrentIndex(index % images.length);
    };

    const nextSlide = () => {
        goToSlide(currentIndex + 1);
    };

    const prevSlide = () => {
        goToSlide(currentIndex - 1);
    };

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative group">
                <div className="relative w-full aspect-video bg-muted/10 rounded-lg overflow-hidden border border-border/40">
                    <img
                        src={currentImage.src}
                        alt={currentImage.alt}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => onImageClick?.(currentImage)}
                            className="text-white hover:bg-white/20"
                        >
                            <Maximize2 className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}

                {/* Counter */}
                {images.length > 1 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 text-white text-xs rounded-full backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Slide Title */}
            {showTitles && (
                <h4 className="text-lg font-semibold text-foreground">
                    {currentImage.title}
                </h4>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, idx) => (
                        <button
                            key={image.id}
                            onClick={() => goToSlide(idx)}
                            className={cn(
                                "flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                                idx === currentIndex
                                    ? "border-primary"
                                    : "border-border/40 hover:border-border/60 opacity-70 hover:opacity-100"
                            )}
                        >
                            <img
                                src={image.src}
                                alt={`Slide ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

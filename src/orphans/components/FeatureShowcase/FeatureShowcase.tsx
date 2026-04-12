import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { ScreenshotCarousel, type CarouselImage } from "@/components/ScreenshotCarousel/ScreenshotCarousel";
import { cn } from "@/lib/utils";

interface FeatureShowcaseProps {
    id: string;
    title: string;
    description: string;
    images: CarouselImage[];
    videoUrl?: string;
    onImageClick?: (image: CarouselImage) => void;
    onVideoClick?: () => void;
    reverse?: boolean;
    delay?: number;
}

export function FeatureShowcase({
    id,
    title,
    description,
    images,
    videoUrl,
    onImageClick,
    onVideoClick,
    reverse = false,
    delay = 0,
}: FeatureShowcaseProps) {
    return (
        <FadeInSection delay={delay} className="py-20 border-b border-border/40 last:border-b-0">
            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
                reverse && "md:grid-cols-2"
            )}>
                {/* Content Section */}
                <div className={cn(reverse && "md:order-2")}>
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                <span className="text-sm font-medium text-blue-400">Feature</span>
                            </div>
                            <h2 className="text-4xl font-bold text-foreground mb-4">
                                {title}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            {description}
                        </p>

                        {/* Key Points (if needed - can be extended) */}
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                Real-time data processing and insights
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                Comprehensive analytics and reporting
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                Easy integration and deployment
                            </li>
                        </ul>

                        {/* CTA Button */}
                        {videoUrl && (
                            <div className="pt-4">
                                <Button
                                    onClick={onVideoClick}
                                    variant="outline"
                                    className="gap-2"
                                    size="lg"
                                >
                                    <Play className="w-4 h-4" />
                                    See it in Action
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Carousel Section */}
                <div className={cn(reverse && "md:order-1")}>
                    <ScreenshotCarousel
                        images={images}
                        onImageClick={onImageClick}
                        showTitles={true}
                    />
                </div>
            </div>
        </FadeInSection>
    );
}

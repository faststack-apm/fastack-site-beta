import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingFeature {
    label: string;
    included: boolean;
}

export interface PricingTier {
    id: string;
    name: string;
    subtitle: string;
    price: string | number;
    originalPrice?: string | number;
    period?: string;
    description: string;
    features: PricingFeature[];
    cta: string;
    highlighted?: boolean;
    ingestion?: string;
    retention?: string;
}

interface PricingTierCardProps {
    tier: PricingTier;
    onSelect?: (tierId: string) => void;
}

export function PricingTierCard({
    tier,
    onSelect,
}: PricingTierCardProps) {
    return (
        <div
            className={cn(
                "glass-card rounded-lg border transition-all duration-300 hover:shadow-lg hover:border-primary/50",
                tier.highlighted
                    ? "border-primary/80 ring-2 ring-primary/20 relative lg:scale-105"
                    : "border-border/40"
            )}
        >
            {/* Popular Badge */}
            {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
                    Most Popular
                </div>
            )}

            <div className="p-8 space-y-6">
                {/* Tier Header */}
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                        {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {tier.subtitle}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                        {tier.originalPrice && (
                            <span className="text-xl text-muted-foreground/60 line-through decoration-2 decoration-red-500/50">
                                {typeof tier.originalPrice === "number" || /^\d/.test(tier.originalPrice as string) ? `$${tier.originalPrice}` : tier.originalPrice}
                            </span>
                        )}
                        <span className="text-4xl font-bold text-foreground">
                            {typeof tier.price === "number" || /^\d/.test(tier.price as string) ? `$${tier.price}` : tier.price}
                        </span>
                        {tier.period && (
                            <span className="text-muted-foreground">/{tier.period}</span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                </p>

                {/* Ingestion & Retention */}
                {(tier.ingestion || tier.retention) && (
                    <div className="space-y-2 pt-2 border-t border-border/40">
                        {tier.ingestion && (
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Ingestion:</span>{" "}
                                {tier.ingestion}
                            </p>
                        )}
                        {tier.retention && (
                            <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Retention:</span>{" "}
                                {tier.retention}
                            </p>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                <Button
                    onClick={() => onSelect?.(tier.id)}
                    variant={tier.highlighted ? "default" : "outline"}
                    className="w-full"
                >
                    {tier.cta}
                </Button>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                    {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check
                                className={cn(
                                    "w-5 h-5 mt-0.5 flex-shrink-0",
                                    feature.included
                                        ? "text-green-400"
                                        : "text-muted-foreground/30"
                                )}
                            />
                            <span
                                className={cn(
                                    "text-sm",
                                    feature.included
                                        ? "text-foreground"
                                        : "text-muted-foreground/50"
                                )}
                            >
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

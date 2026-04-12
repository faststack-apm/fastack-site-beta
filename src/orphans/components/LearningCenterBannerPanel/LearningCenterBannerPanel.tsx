import Link from "next/link";

interface LearningCenterBannerPanelProps {
    title: string;
    description: string;
    link?: string;
}

export default function LearningCenterBannerPanel({ title, description, link }: LearningCenterBannerPanelProps) {
    const Content = (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel hover:bg-muted/5 transition-colors mb-[15px]">
            <div>
                <h2 className="text-xl font-bold text-foreground">{title}</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            </div>
        </div>
    );

    if (link) {
        return (
            <Link href={link} className="block">
                {Content}
            </Link>
        );
    }

    return Content;
}
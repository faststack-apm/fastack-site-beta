import { Button } from "@/components/ui/button";

interface UsageProfilePanelProps {
    onContinue?: () => void;
    onPrevious?: () => void;
}

const UsageProfilePanel = ({ onContinue, onPrevious }: UsageProfilePanelProps) => {
    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">Usage Profile</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Great, we are almost there! Please tell us about the primary we you intend to view analytics data. We will attempt to create a customized prebuilt dashboard based on your specific needs. This will give you a jump start into your analytics journey, however you can adjust your dashboards at any time in the future.
                </p>

                <div className="text-xs text-muted-foreground mt-1">
                    <h2 className="font-bold">Usage Focused</h2>
                    <p>You intend to spend more time understanding traffic patterns, traffic funnels, traffic sources, and top performing pages.</p>
                </div>

                <div className="text-xs text-muted-foreground mt-1">
                    <h2 className="font-bold">Performance Focused</h2>
                    <p>You are more concearned with site performance related aspects such as page speed, exceptions, and correlations between usage and response times.</p>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={onPrevious}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={onContinue}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UsageProfilePanel;

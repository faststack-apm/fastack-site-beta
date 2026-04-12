import { Button } from "@/components/ui/button";

interface IntroPanelProps {
    onContinue?: () => void;
    onPrevious?: () => void;
}

const IntroPanel = ({ onContinue, onPrevious }: IntroPanelProps) => {
    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">Welcome!</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    It looks like this is your first experience with our web monitoring solution. Before diving right in, we highly recommend that you view a brief tutorial on the setup process, and then as a next step, and then use our setup tool for a brief guided series of steps to get your site connected, and configure a dashboard based on your specific role. This process is designed to get you up and running as quickly as possible. You can fine tune your settings at any time in the future.
                </p>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={onPrevious}
                    >
                        Skip
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

export default IntroPanel;

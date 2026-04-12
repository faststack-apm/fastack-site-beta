import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


const finalizationSteps: Array<string> = [
    "Saving changes",
    "Parsing log files",
    "Creating analytics dashboard",
    "Finalizing configuration"
]

interface FinalSetupPanelProps {
    onContinue?: () => void;
}

const FinalSetupPanel = ({ onContinue }: FinalSetupPanelProps) => {
    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">Finalizing configuration....</h2>



                <Progress value={20} className="w-[90%]" />

                <p className="text-xs text-muted-foreground mt-1 w-[90%]">
                    Saving changes

                    <div className="mb-12 flex items-center justify-between">
                        <p>We are all set !</p>
                    </div>


                </p>


                <div className="flex justify-center mt-6">
                    <Button
                        onClick={onContinue}
                    >
                        Visit Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FinalSetupPanel;
import FileUploadRow from "@/components/FileUploadRow";
import { Button } from "@/components/ui/button";

interface LogUploadPanelProps {
    onContinue?: () => void;
    onPrevious?: () => void;
}

const LogUploadPanel = ({ onContinue, onPrevious }: LogUploadPanelProps) => {
    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">Upload existing logs</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Now that your metrics are now being collected by Fast Stack, we are ready to start configuring dash boards. Customers often find it benefitial to see some existing log data into the the system, so there is at least some data to feed the analytics elements. Use this section to optionally upload recent logs from your existing data into our system.
                </p>
                <div>
                    <h2>[Domain 1] </h2>
                    <hr />
                    <h3>HTTP Logs</h3>
                    <FileUploadRow rowNumber={1} />
                    <h3>Error Logs</h3>
                    <FileUploadRow rowNumber={2} />
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

export default LogUploadPanel;
import ServerRow from "@/components/ServerRow";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ServerAgentDef {
    hostname: string;
    label?: string;
}

interface HttpServerSetupPanelProps {
    onContinue?: () => void;
    onPrevious?: () => void;
}

const HttpServerSetupPanel = ({ onContinue, onPrevious }: HttpServerSetupPanelProps) => {


    const [connectedCount, setConnectedCount] = useState(0);
    const [labeledCount, setLabeledCount] = useState(0);
    const [servers, setServers] = useState<ServerAgentDef[]>([]);

    const mockServerConnectEvent = () => {
        setServers([...servers, { hostname: "example server" }]);
        setConnectedCount(connectedCount + 1);
    }

    const handleMockServer = () => {

    };
    const handleAddServer = () => {

    };

    const handleLabelChange = () => {

    };

    const handleRemoveServer = () => {

    };

    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">HTTP Server Setup</h2>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <p className="text-xs text-muted-foreground mt-1">
                        Perfect, next you will need to configue your http server to report metrics, We currently support both Apache and Nginx. The instructions for each are located below.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="px-4 py-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Connected Servers</p>
                        <p className="text-2xl font-bold text-foreground">{connectedCount}</p>
                    </div>
                    <div className="px-4 py-3 bg-blue-500/10 rounded-lg border border-blue-500/20 mt-4">
                        <p className="text-xs text-muted-foreground">Labeled Servers</p>
                        <p className="text-2xl font-bold text-blue-400">{labeledCount}</p>
                    </div>
                </div>


                {/* Server Rows */}
                <div className="space-y-3">
                    {servers.length > 0 ? (
                        servers.map((server) => (
                            <ServerRow
                                key={server.hostname}
                                serverId={server.hostname}
                                hostname={server.hostname}
                                onLabelChange={handleLabelChange}
                                onRemove={handleRemoveServer}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No connected servers</p>
                        </div>
                    )}
                </div>


                <div>
                    <a onClick={mockServerConnectEvent} className="text-xs text-blue-500">+ Mock server connection</a>
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


        </div >
    );
};

export default HttpServerSetupPanel;
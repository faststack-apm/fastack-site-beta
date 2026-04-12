import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DomainDefinitionPanelProps {
    onContinue?: () => void;
    onPrevious?: () => void;
}

const DomainDefinitionPanel = ({ onContinue, onPrevious }: DomainDefinitionPanelProps) => {
    const [domainCount, setDomainCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [definedDomains, setDefinedDomains] = useState<string[]>([]);

    const parseDomains = (input: string): string[] => {
        // Split by comma to handle multiple domains
        const domains = input.split(',');

        // Process each domain
        const cleanedDomains = domains
            .map(domain => {
                // Trim whitespace
                let cleaned = domain.trim();

                // Remove http:// and https:// protocols
                cleaned = cleaned.replace(/^https?:\/\//i, '');

                // Remove trailing slash if present
                cleaned = cleaned.replace(/\/$/, '');

                return cleaned;
            })
            .filter(domain => domain.length > 0); // Remove empty strings

        return cleanedDomains;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const parsedDomains = parseDomains(inputValue);

            if (parsedDomains.length > 0) {
                setDefinedDomains(parsedDomains);
                setDomainCount(parsedDomains.length);


                // Restore input with cleansed data
                setInputValue(parsedDomains.join(', '));
            }
        }
    };

    return (
        <div className="flex items-center justify-between p-6 border-b border-border/20 glass-panel">
            <div>
                <h2 className="text-xl font-bold text-foreground">Enter your domain(s)</h2>
                <p className="text-xs text-muted-foreground mt-1">
                    Excellent, so metrics are collected based on a domain by domain basis. So first let's enter in your domain name(s) here. If you want to setup multiple domains, then separate each by a comma. Your AI-powered assistant
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="px-4 py-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Defined domains</p>
                        <p className="text-2xl font-bold text-foreground">{domainCount}</p>
                    </div>
                    <div className="px-4 py-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Available domains</p>
                        <p className="text-2xl font-bold text-foreground">{domainCount}</p>
                    </div>
                </div>

                <div className="space-y-2 mt-4">

                    <p className="text-xs text-muted-foreground">
                        Please enter your domain name(s) here. If you want to setup multiple domains, then separate each by a comma.
                        Hit the enter key to save results. for example: <span className="font-bold">example.com, another-site.com</span>
                        i.e. prootol suffix not required.
                    </p>

                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="example.com, another-site.com"
                    />
                    {definedDomains.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-success">
                            <CheckCircle className="w-4 h-4" />
                            <span>Looks good! Domains: {definedDomains.join(', ')}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        variant="outline"
                        onClick={onPrevious}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={onContinue}
                        disabled={domainCount === 0}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default DomainDefinitionPanel;
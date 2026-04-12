import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils/string-utils";


interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const EmailInput = ({ value, onChange }: Props) => {
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleBlur = () => {
        if (!isValidEmail(value)) {
            setEmailError("Please enter a valid email address");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailError(null);
        onChange(e.target.value);
    };

    return (
        <div>
            <input
                type="email"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john.doe@example.com"
            />

            {emailError && <div className="flex items-center gap-2 text-xs text-error">
                <AlertCircle className="w-4 h-4" />
                <span>{emailError}</span>
            </div>}
        </div>
    );
}

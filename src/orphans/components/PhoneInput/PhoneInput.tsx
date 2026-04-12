import { formatPhoneNumber, isValidPhoneNumber } from "@/lib/utils/string-utils";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const PhoneInput = ({ value, onChange }: Props) => {
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const handleBlur = () => {
        if (!isValidPhoneNumber(value)) {
            setPhoneError("Please enter a valid phone number (123-456-7890)");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneError(null);
        const formattedValue = formatPhoneNumber(e.target.value);
        onChange(formattedValue);
    };

    return (
        <div>
            <input
                type="tel"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="123-456-7890"
            />
            {phoneError && <div className="flex items-center gap-2 text-xs text-error">
                <AlertCircle className="w-4 h-4" />
                <span>{phoneError}</span>
            </div>}
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
    SupportTicket,
    TicketType,
    SeverityLevel,
    TicketStatus,
    TICKET_TYPES,
    SEVERITY_LEVELS,
    TICKET_STATUSES,
    getAllTags,
    MOCK_SUPPORT_TICKETS,
} from "@/lib/constants/supportTickets";
import { useToast } from "@/hooks/use-toast";

interface SupportTicketFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        ticketData: Omit<SupportTicket, "id" | "createdAt" | "updatedAt">,
    ) => void;
    editingTicket?: SupportTicket | null;
}

export const SupportTicketFormModal: React.FC<SupportTicketFormModalProps> = ({
    isOpen,
    onClose,
    onSave,
    editingTicket,
}) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState<
        Omit<SupportTicket, "id" | "createdAt" | "updatedAt">
    >({
        title: "",
        description: "",
        type: "support-ticket",
        severity: "medium",
        status: "open",
        customerEmail: "",
        customerName: "",
        assignedTo: "",
        tags: [],
        messages: 0,
    });

    const [currentTag, setCurrentTag] = useState("");
    const allAvailableTags = getAllTags(MOCK_SUPPORT_TICKETS);

    useEffect(() => {
        if (editingTicket) {
            setFormData({
                title: editingTicket.title,
                description: editingTicket.description,
                type: editingTicket.type,
                severity: editingTicket.severity,
                status: editingTicket.status,
                customerEmail: editingTicket.customerEmail,
                customerName: editingTicket.customerName,
                assignedTo: editingTicket.assignedTo || "",
                tags: editingTicket.tags,
                messages: editingTicket.messages,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                type: "support-ticket",
                severity: "medium",
                status: "open",
                customerEmail: "",
                customerName: "",
                assignedTo: "",
                tags: [],
                messages: 0,
            });
        }
        setCurrentTag("");
    }, [editingTicket, isOpen]);

    const handleFieldChange = <K extends keyof typeof formData>(
        field: K,
        value: (typeof formData)[K],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddTag = () => {
        const trimmedTag = currentTag.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, trimmedTag],
            }));
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tagToRemove),
        }));
    };

    const handleSubmit = () => {
        // Validation
        if (!formData.title.trim()) {
            toast({
                title: "Validation Error",
                description: "Title is required",
                variant: "destructive",
            });
            return;
        }

        if (!formData.description.trim()) {
            toast({
                title: "Validation Error",
                description: "Description is required",
                variant: "destructive",
            });
            return;
        }

        if (!formData.customerEmail.trim()) {
            toast({
                title: "Validation Error",
                description: "Customer email is required",
                variant: "destructive",
            });
            return;
        }

        if (!formData.customerName.trim()) {
            toast({
                title: "Validation Error",
                description: "Customer name is required",
                variant: "destructive",
            });
            return;
        }

        if (formData.type === "support-ticket" && !formData.severity) {
            toast({
                title: "Validation Error",
                description: "Severity is required for support tickets",
                variant: "destructive",
            });
            return;
        }

        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingTicket ? "Edit Support Ticket" : "New Support Ticket"}
            description={
                editingTicket
                    ? "Update ticket information"
                    : "Create a new support ticket or conversation"
            }
            className="max-w-2xl"
        >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                        placeholder="Brief summary of the issue"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                        placeholder="Detailed description of the issue or inquiry"
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                </div>

                {/* Ticket Type and Severity */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Type <span className="text-red-400">*</span>
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) =>
                                handleFieldChange("type", e.target.value as TicketType)
                            }
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            {(
                                Object.entries(TICKET_TYPES) as [
                                    TicketType,
                                    (typeof TICKET_TYPES)[TicketType],
                                ][]
                            ).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-muted-foreground mt-1">
                            {TICKET_TYPES[formData.type].description}
                        </p>
                    </div>

                    {formData.type === "support-ticket" && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Severity <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.severity || "medium"}
                                onChange={(e) =>
                                    handleFieldChange("severity", e.target.value as SeverityLevel)
                                }
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                {(
                                    Object.entries(SEVERITY_LEVELS) as [
                                        SeverityLevel,
                                        (typeof SEVERITY_LEVELS)[SeverityLevel],
                                    ][]
                                ).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Status <span className="text-red-400">*</span>
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            handleFieldChange("status", e.target.value as TicketStatus)
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        {(
                            Object.entries(TICKET_STATUSES) as [
                                TicketStatus,
                                (typeof TICKET_STATUSES)[TicketStatus],
                            ][]
                        ).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Customer Information */}
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                        Customer Information
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Customer Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.customerName}
                                onChange={(e) =>
                                    handleFieldChange("customerName", e.target.value)
                                }
                                placeholder="Customer or company name"
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Customer Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                value={formData.customerEmail}
                                onChange={(e) =>
                                    handleFieldChange("customerEmail", e.target.value)
                                }
                                placeholder="customer@example.com"
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Assigned To and Messages Count */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Assigned To
                        </label>
                        <input
                            type="text"
                            value={formData.assignedTo}
                            onChange={(e) => handleFieldChange("assignedTo", e.target.value)}
                            placeholder="Support team member name"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Message Count
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={formData.messages}
                            onChange={(e) =>
                                handleFieldChange("messages", parseInt(e.target.value) || 0)
                            }
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            placeholder="Type a tag and press Enter or click Add"
                            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            list="available-tags"
                        />
                        <datalist id="available-tags">
                            {allAvailableTags.map((tag) => (
                                <option key={tag} value={tag} />
                            ))}
                        </datalist>
                        <Button onClick={handleAddTag} variant="outline" size="sm">
                            Add
                        </Button>
                    </div>

                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-sm text-cyan-400"
                                >
                                    <span>{tag}</span>
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:text-cyan-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                    <Button onClick={onClose} variant="outline" className="flex-1">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                    >
                        {editingTicket ? "Update Ticket" : "Create Ticket"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

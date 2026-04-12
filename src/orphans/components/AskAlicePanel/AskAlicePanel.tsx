import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { PanelActions, type PanelAction } from "@/components/PanelActions/PanelActions";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AskAlicePanelProps {
    title?: string;
    onHidePanel?: () => void;
    className?: string;
}

export const AskAlicePanel: React.FC<AskAlicePanelProps> = ({
    title = "Ask Alice",
    onHidePanel,
    className,
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hello! I'm Alice, your AI assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(
                textareaRef.current.scrollHeight,
                120
            ) + "px";
        }
    }, [input]);

    const simulateAIResponse = async (userMessage: string): Promise<string> => {
        // Mock AI response - in production, this would call your backend API
        // Example: POST /api/ai/ask-alice with { message: userMessage }
        const mockResponses = [
            "That's an interesting question! Based on your system metrics, I can see that your API response time is looking good. The current average is around 145ms, which is well within acceptable ranges for most applications.",
            "Looking at your traffic patterns, I notice peak activity occurs during business hours. This is typical for most SaaS applications. Your traffic usage panel shows a steady pattern with occasional spikes.",
            "Your error rate of 0.32% is excellent! This indicates a very stable and reliable system. I'd recommend maintaining your current monitoring practices to catch any potential issues early.",
            "The resource utilization across your infrastructure looks balanced. CPU at 68% and Memory at 82% suggests you're making good use of your allocated resources without being overutilized.",
        ];

        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const responseText = await simulateAIResponse(input);

            // Add assistant message with animated text
            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                role: "assistant",
                content:
                    "I encountered an error processing your request. Please try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const panelActions: PanelAction[] = onHidePanel
        ? [
            {
                id: "hide",
                label: "Remove",
                variant: "destructive",
                onClick: () => onHidePanel?.(),
            },
        ]
        : [];

    const containerVariants: Variants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.2 },
        },
    };

    return (
        <motion.div
            className={cn(
                "glass-panel rounded-xl bg-gradient-to-br from-muted/30 to-card/30 flex flex-col overflow-hidden",
                className
            )}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                variants={contentVariants}
                className="flex flex-col h-[600px] overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/20">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">{title}</h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            Your AI-powered assistant
                        </p>
                    </div>
                    {onHidePanel && <PanelActions actions={panelActions} />}
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-3 animate-in fade-in slide-in-from-bottom-2",
                                message.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {message.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                                    A
                                </div>
                            )}

                            <div
                                className={cn(
                                    "max-w-xs lg:max-w-md px-4 py-3 rounded-lg",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted text-foreground rounded-bl-none"
                                )}
                            >
                                <AnimatedText text={message.content} />
                            </div>

                            {message.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                                    U
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                                <Loader className="w-4 h-4 animate-spin text-white" />
                            </div>
                            <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                    <div
                                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                        style={{ animationDelay: "100ms" }}
                                    />
                                    <div
                                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                        style={{ animationDelay: "200ms" }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-border/20 space-y-3">
                    <div className="flex gap-2">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Alice anything... (Shift+Enter for new line)"
                            className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm max-h-30"
                            rows={1}
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            size="icon"
                            className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90"
                        >
                            {isLoading ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Alice is powered by AI and may occasionally provide inaccurate
                        information.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

interface AnimatedTextProps {
    text: string;
    delay?: number;
}

/**
 * AnimatedText component that displays text with word-by-word animation
 * Creates a streaming/typewriter effect for AI responses
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0 }) => {
    const words = text.split(" ");

    return (
        <span>
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + index * 0.05,
                    }}
                >
                    {word}{" "}
                </motion.span>
            ))}
        </span>
    );
};

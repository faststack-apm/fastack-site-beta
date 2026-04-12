import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore, type PageType } from "@/lib/stores/appStore";


const PAGE_CONTEXT: Record<PageType, { title: string; description: string }> = {
  dashboard: {
    title: "Ask Alice - Dashboard",
    description: "Get insights about your system performance and metrics",
  },
  traces: {
    title: "Ask Alice - Traces",
    description: "Analyze and understand your distributed traces",
  },
  services: {
    title: "Ask Alice - Services",
    description: "Learn about your services and their performance",
  },
  analytics: {
    title: "Ask Alice - Analytics",
    description: "Explore your analytics data and trends",
  },
  settings: {
    title: "Ask Alice - Settings",
    description: "Get help configuring your settings",
  },
  about: {
    title: "Ask Alice - About",
    description: "Learn more about this platform",
  },
  contact: {
    title: "Ask Alice - Contact",
    description: "Get help with contacting support",
  },
  product: {
    title: "Ask Alice - Product",
    description: "Explore product features and capabilities",
  },
  features: {
    title: "Ask Alice - Features",
    description: "Discover key platform features",
  },
  blog: {
    title: "Ask Alice - Blog",
    description: "Discuss blog topics and articles",
  },
  "blog-article": {
    title: "Ask Alice - Article",
    description: "Discuss the current article",
  },
  forms: {
    title: "Ask Alice - Forms",
    description: "Get help with form submission and validation",
  },
  "beta-signup": {
    title: "Ask Alice - Beta Signup",
    description: "Get help with joining our beta program",
  },
  "layout-editor": {
    title: "Ask Alice - Layout Editor",
    description: "Get help customizing your dashboard layout",
  },
  "login": {
    title: "Ask Alice - Login",
    description: "Get help with signing in to your account",
  },
  "forgot-password": {
    title: "Ask Alice - Password Reset",
    description: "Get help recovering your password",
  },
  "beta-learning-center": {
    title: "Ask Alice - Learning Center",
    description: "Learn effective strategies and tutorials",
  },
  "beta-contact": {
    title: "Ask Alice - Contact Support",
    description: "Get help reaching out to our support team",
  },
  "beta-web-experience": {
    title: "Ask Alice - Web Experience",
    description: "Learn how to optimize your web user experience monitoring",
  },
  "beta-uptime": {
    title: "Ask Alice - Uptime Monitoring",
    description: "Get help with different uptime checks and alerts",
  },
  "beta-debug": {
    title: "Ask Alice - Debug Tools",
    description: "Get help with debugging and diagnostics",
  },
  "beta-control-panel": {
    title: "Ask Alice - Control Panel",
    description: "Get help with system configuration and management",
  },
  "beta-control-panel-cluster-management": {
    title: "Ask Alice - Cluster Management",
    description: "Get help managing and monitoring your clusters",
  },
  "beta-control-panel-customer-management": {
    title: "Ask Alice - Customer Management",
    description: "Get help managing customers and their subscriptions",
  },
  "beta-control-panel-product-offering": {
    title: "Ask Alice - Product Offering",
    description: "Get help configuring products and subscription plans",
  },
  "beta-control-panel-support-tickets": {
    title: "Ask Alice - Support Tickets",
    description: "Get help managing customer support tickets",
  },
  "not-found": {
    title: "Ask Alice",
    description: "I'm here to help",
  },
};

/**
 * Global Chat Modal that appears as an overlay and provides context-sensitive
 * AI assistance based on the currently viewed page.
 */
export const GlobalChatModal: React.FC = () => {
  const { isChatModalOpen, closeChatModal, currentPage } = useAppStore();
  const context = PAGE_CONTEXT[currentPage];

  return (
    <Dialog open={isChatModalOpen} onOpenChange={closeChatModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 bg-gradient-to-r from-muted/50 to-card/50 border-b border-border/20">
          <DialogTitle className="text-2xl">{context.title}</DialogTitle>
          <DialogDescription>{context.description}</DialogDescription>
        </DialogHeader>

        {/* Chat Panel - Simplified Version for Modal */}
        <div className="h-[calc(90vh-120px)] overflow-hidden">
          <div className="h-full overflow-y-auto p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                A
              </div>
              <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none max-w-xs">
                <p className="text-sm">
                  Hello! I'm Alice, your AI assistant. I'm here to help you with
                  questions about {context.description.toLowerCase()}. What would
                  you like to know?
                </p>
              </div>
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border/20 p-6 bg-gradient-to-r from-muted/30 to-card/30">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Ask Alice anything..."
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 rounded-lg flex items-center justify-center text-white">
                ↵
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Context: {context.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

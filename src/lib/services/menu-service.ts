import { NestedMenuItem } from "@/components/NestedDropdownMenu/NestedDropdownMenu"

const mockMenu: NestedMenuItem[] = [
    {
        label: "Raw Working Pages",
        icon: "⚡",
        children: [

            {
                label: "User Management",
                href: "/beta/UserManagement",
            },
            {
                label: "Trace",
                href: "/beta/Trace Analysis",
            },
            {
                label: "Learning Center",
                href: "/beta/LearningCenter",
            },
            {
                label: "Billing and Usage",
                href: "/beta/Usage",
            },
            {
                label: "Subscription",
                href: "/beta/Subscription",
            },
            {
                label: "Uptime",
                href: "/beta/Uptime",
            },
            {
                label: "Web Experience",
                href: "/beta/WebExperience",
            },
            {
                label: "Triage",
                href: "/beta/Triage",
            },
            {
                label: "Alerting",
                href: "/beta/Alerting",
            },
            {
                label: "Contact/Support",
                href: "/beta/Contact",
            },
            {
                label: "Site Traffic Analysis",
                href: "/beta/SiteTrafficAnalysis",
            },
            {
                label: "Debug",
                href: "/beta/Debug",
            },
            {
                label: "Control Panel",
                href: "/beta/ControlPanel",
            },


        ],
    },
    {
        label: "Custom Dashboards",
        icon: "🎯",
        children: [
            {
                label: "My Custom Dashboard 1",
                href: "/",
            },
            {
                label: "My Custom Dashboard 2",
                href: "/",
            },
        ],
    },
]

export const getMenuItems = (): Promise<NestedMenuItem[]> => {
    return new Promise((resolve) => {
        // Calculate random delay between 3000ms and 6000ms
        const randomDelay = Math.floor(Math.random() * (6000 - 3000 + 1) + 3000);

        setTimeout(() => {
            resolve(mockMenu);
        }, randomDelay);
    });
};
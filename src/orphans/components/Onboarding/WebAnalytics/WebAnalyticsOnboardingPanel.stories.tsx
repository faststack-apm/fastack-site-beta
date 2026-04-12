import type { Meta, StoryObj } from "@storybook/react";
import WebAnalyticsOnboardingPanel from "./WebAnalyticsOnboardingPanel";

const meta = {
    title: "Components/Onboarding/WebAnalyticsOnboardingPanel",
    component: WebAnalyticsOnboardingPanel,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Login page with email and password fields. Includes remember me checkbox and forgot password CTA link.",
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof WebAnalyticsOnboardingPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default login page
 */
export const Default: Story = {};

/**
 * Login page showing demo credentials
 */
export const WithDemoCredentials: Story = {
    decorators: [
        (Story) => {
            // Story will display the demo credentials box
            return <Story />;
        },
    ],
};

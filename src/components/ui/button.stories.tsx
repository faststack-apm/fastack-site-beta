import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Download, RefreshCw, Trash2 } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component supporting multiple variants and sizes",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with primary color
 */
export const Default: Story = {
  args: {
    children: "Click me",
  },
};

/**
 * Secondary button variant
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

/**
 * Destructive button for dangerous actions
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

/**
 * Outline button with border
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

/**
 * Ghost button with minimal styling
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

/**
 * Link button styled as a hyperlink
 */
export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

/**
 * Button with icon
 */
export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        Download
      </div>
    ),
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

/**
 * Loading state with icon
 */
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <div className="flex items-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin" />
        Loading...
      </div>
    ),
  },
};

/**
 * Button group example
 */
export const Group: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </div>
  ),
};

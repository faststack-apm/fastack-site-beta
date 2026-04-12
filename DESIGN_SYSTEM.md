# APM Dashboard Design System

A modern, production-ready design system for Application Performance Monitoring (APM) applications. Built with React, TypeScript, Tailwind CSS, and a dark theme optimized for long-duration monitoring work.

## Design Principles

### Visual Hierarchy
- **Large, readable metrics** - Primary data points are prominently displayed
- **Glass-morphism panels** - Semi-transparent cards with blur effects for depth
- **Gradient accents** - Blue-to-cyan gradients guide attention to key elements
- **Status colors** - Traffic light indicators (green/yellow/red) for quick status assessment

### Color Palette

#### Neutrals (Dark Theme)
- **Background**: `hsl(217 33% 8%)` - Deep navy background
- **Card**: `hsl(217 32% 13%)` - Slightly lighter for panel distinction
- **Foreground**: `hsl(210 40% 98%)` - Near-white text for readability
- **Muted**: `hsl(217 14% 28%)` - Secondary text and disabled states

#### Status Colors
- **Success**: `hsl(142 76% 36%)` - Green for healthy/good status
- **Warning**: `hsl(38 92% 50%)` - Amber/yellow for caution
- **Error**: `hsl(0 84% 60%)` - Red for critical issues
- **Info**: `hsl(217 91% 60%)` - Blue for informational

#### Accents
- **Primary**: Blue `hsl(217 91% 60%)` - Main interactive color
- **Secondary**: Cyan `hsl(180 100% 50%)` - Alternative accent

## Component Library

### Status Badge
Status indicators that communicate component/service health at a glance.

```tsx
import { StatusBadge } from "@/components/StatusBadge";

<StatusBadge status="success" label="Healthy" />
<StatusBadge status="warning" label="Degraded" />
<StatusBadge status="error" label="Offline" />
<StatusBadge status="info" label="Updating" />
<StatusBadge status="neutral" label="Unknown" />
```

**Props:**
- `status`: "success" | "warning" | "error" | "info" | "neutral"
- `label`: Badge text
- `icon`: Optional React node for visual icon
- `className`: Additional Tailwind classes

---

### Metric Card
Display key performance metrics with optional trend indicators.

```tsx
import { MetricCard } from "@/components/MetricCard";
import { Zap } from "lucide-react";

<MetricCard
  label="Response Time"
  value="145ms"
  change={{ value: "-12%", type: "positive" }}
  icon={<Zap className="w-6 h-6" />}
  subtitle="Last 24 hours"
/>
```

**Props:**
- `label`: Metric name (auto-uppercased)
- `value`: Display value (string or number)
- `change`: Optional `{ value: string | number, type: "positive" | "negative" | "neutral" }`
- `icon`: Optional icon component
- `subtitle`: Additional context text
- `className`: Additional classes

---

### Progress Ring
Circular progress indicator with gradient fill, useful for health scores and percentages.

```tsx
import { ProgressRing } from "@/components/ProgressRing";

<ProgressRing
  value={83}
  max={100}
  size="md"
  color="primary"
  label="Overall Health"
  subtitle="Based on all services"
/>
```

**Props:**
- `value`: Current value
- `max`: Maximum value (default: 100)
- `size`: "sm" | "md" | "lg"
- `color`: "primary" | "success" | "warning" | "error"
- `label`: Circle label text
- `subtitle`: Text below label
- `className`: Additional classes

---

### Data Table
Responsive table component for displaying structured data with optional formatting.

```tsx
import { DataTable } from "@/components/DataTable";

const columns = [
  { header: "Service", accessor: "name", width: "25%" },
  {
    header: "Status",
    accessor: (item) => <StatusBadge status="success" label={item.status} />,
    width: "20%",
  },
  { header: "Uptime", accessor: "uptime", align: "right", width: "25%" },
];

<DataTable columns={columns} data={services} />
```

**Column Props:**
- `header`: Column header text
- `accessor`: Property key or function to extract cell value
- `width`: Optional CSS width (e.g., "25%")
- `align`: "left" | "center" | "right" (default: "left")

---

### Stats Banner
High-level statistics overview with optional trend indicators.

```tsx
import { StatsBanner } from "@/components/StatsBanner";
import { Server } from "lucide-react";

<StatsBanner
  title="Service Overview"
  subtitle="Current system health"
  stats={[
    {
      label: "Total Services",
      value: "6",
      icon: <Server className="w-4 h-4" />,
    },
    {
      label: "Healthy",
      value: "5",
      trend: { value: "100%", direction: "up" },
    },
  ]}
/>
```

**Stats Item Props:**
- `label`: Stat label (auto-uppercased)
- `value`: Display value
- `icon`: Optional icon component
- `trend`: Optional `{ value: string | number, direction: "up" | "down" }`

---

### Chart Placeholder
Animated placeholder for chart areas during data loading or as a design reference.

```tsx
import { ChartPlaceholder } from "@/components/ChartPlaceholder";

<ChartPlaceholder
  title="Response time and throughput"
  height="h-80"
/>
```

**Props:**
- `title`: Optional subtitle text
- `height`: Tailwind height class (default: "h-64")
- `className`: Additional classes

---

### Header
Sticky header with navigation and quick actions.

```tsx
import { Header } from "@/components/Header";

<Header />
```

No props - Header uses React Router Link components and includes:
- Logo/branding area
- Main navigation (Dashboard, Services, Alerts, Analytics)
- Notification and settings buttons
- Mobile-responsive hamburger menu

---

## CSS Custom Components

All components use Tailwind's `@layer components` to provide utility classes:

### Glass-morphism Classes

**`.glass-card`**
- Transparent background with blur effect
- Subtle border
- Moderate transparency for text overlay compatibility

**`.glass-panel`**
- Enhanced glass effect with gradient background
- Greater transparency and blur
- Used for larger container elements

### Status Badge Classes

**`.status-success`**, **`.status-warning`**, **`.status-error`**, **`.status-info`**
- Pre-styled status badges with color-specific backgrounds and borders
- Compatible with inline usage

### Metric Classes

**`.metric-card`** - Glass panel styled for metrics
**`.metric-value`** - Large metric display text
**`.metric-label`** - Uppercase metric label
**`.metric-change`** - Change indicator with conditional colors (`.positive`, `.negative`)

---

## Design Patterns

### Responsive Layouts

**Two-Column Dashboard**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main content - 2 columns on large screens */}
  </div>
  <div>
    {/* Sidebar - 1 column on large screens */}
  </div>
</div>
```

**Service Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards automatically stack on mobile, 2 columns on tablet, 3 on desktop */}
</div>
```

### Alert/Notification Pattern

```tsx
<div className="glass-card p-4 rounded-lg border border-border/40">
  <div className="flex items-start gap-3">
    <IconComponent className="flex-shrink-0 w-5 h-5 text-[color]" />
    <div className="flex-1">
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
</div>
```

### Progress Bar Pattern

```tsx
<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-primary to-cyan-400"
    style={{ width: "68%" }}
  />
</div>
```

---

## Usage Examples

### Basic Dashboard Card

```tsx
import { MetricCard } from "@/components/MetricCard";
import { Activity } from "lucide-react";

export function RequestsCard() {
  return (
    <MetricCard
      label="Requests/sec"
      value="12.4k"
      change={{ value: "+8.2%", type: "positive" }}
      icon={<Activity className="w-6 h-6" />}
      subtitle="Peak traffic"
    />
  );
}
```

### Service Health Overview

```tsx
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";

export function ServicesList() {
  return (
    <DataTable
      columns={[
        { header: "Service", accessor: "name" },
        {
          header: "Status",
          accessor: (service) => (
            <StatusBadge
              status={service.status === "healthy" ? "success" : "error"}
              label={service.status}
            />
          ),
        },
      ]}
      data={services}
    />
  );
}
```

### Health Score Display

```tsx
import { ProgressRing } from "@/components/ProgressRing";

export function HealthScore({ score }: { score: number }) {
  return (
    <ProgressRing
      value={score}
      size="lg"
      color={score > 80 ? "success" : score > 60 ? "warning" : "error"}
      label="System Health"
    />
  );
}
```

---

## Customization Guide

### Changing Colors

All colors are defined as CSS variables in `client/global.css`:

```css
:root {
  --primary: 217 91% 60%;          /* Blue */
  --secondary: 180 100% 50%;       /* Cyan */
  --success: 142 76% 36%;          /* Green */
  --warning: 38 92% 50%;           /* Amber */
  --error: 0 84% 60%;              /* Red */
}
```

Update these HSL values to change the entire theme. The format must remain `hue saturation% lightness%`.

### Adding Brand Fonts

Fonts are imported in `client/global.css`. Currently using **Inter**.

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap");
```

Update `font-family` in `body` base styles to apply globally.

### Tweaking Spacing and Radius

Default spacing and border radius are set in `tailwind.config.ts`:

```ts
extend: {
  borderRadius: {
    lg: "var(--radius)",  // 0.5rem
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
  },
}
```

Update `--radius` in CSS variables to change globally.

---

## File Structure

```
client/
├── components/
│   ├── Header.tsx                 # Navigation header
│   ├── MetricCard.tsx            # KPI display card
│   ├── StatusBadge.tsx           # Status indicator
│   ├── ProgressRing.tsx          # Circular progress
│   ├── DataTable.tsx             # Structured data display
│   ├── StatsBanner.tsx           # Overview stats
│   ├── ChartPlaceholder.tsx      # Loading/reference chart
│   └── ui/                        # Radix UI components
├── pages/
│   ├── Index.tsx                 # Main dashboard
│   ├── Services.tsx              # Services monitoring
│   └── NotFound.tsx              # 404 page
├── global.css                    # Theme variables & utilities
└── App.tsx                       # Routes & providers
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All components use modern CSS with fallbacks for backdrop-filter compatibility.

---

## Next Steps

Ready to customize? Here's what you can do:

1. **Add more pages** - Create new files in `client/pages/`
2. **Create service-specific components** - Extract reusable patterns into `client/components/`
3. **Connect to real data** - Replace mock data with API calls using React Query
4. **Customize colors** - Edit CSS variables in `client/global.css` and `tailwind.config.ts`
5. **Add charts** - Integrate Recharts, Chart.js, or similar libraries
6. **Implement real-time** - Use WebSockets or Server-Sent Events for live updates


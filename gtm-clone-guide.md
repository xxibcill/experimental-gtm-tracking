# GTM Feature Clone Guide for AI Agents

Complete guide to replicate the content-generator-web GTM tracking in another Next.js project. Includes full UI with mock data - no LLM integration required.

## Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-slot": "^1.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.563.0",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}
```

---

## File Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  background-gradient.tsx
  category-tab.tsx
  category-tabs.tsx
  content-generator-page.tsx
  error-boundary.tsx
  generate-button.tsx
  generated-content.tsx
  header.tsx
  hero-section.tsx
  icons/crypto-icon.tsx
  news-card.tsx
  news-card-list.tsx
  section-header.tsx
  tone-selector.tsx
  ui/accordion.tsx
  ui/alert.tsx
  ui/button.tsx
  ui/select.tsx
data/
  constants.ts
  mock-data.ts
lib/
  gtm.ts
  utils.ts
types/
  index.ts
```

---

## Core Files

### 1. `types/index.ts`

```typescript
export type CategoryId = 'crypto' | 'politics' | 'business' | 'technology' | 'entertainment'

export interface Category {
  id: CategoryId
  label: string
  icon: string
}

export type ToneOfVoice = 'neutral' | 'professional' | 'casual' | 'spicy'

export interface ToneOption {
  value: ToneOfVoice
  label: string
}

export interface NewsStory {
  id: string
  categoryId: CategoryId
  title: string
  description: string
}
```

### 2. `lib/gtm.ts`

```typescript
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

type DataLayerEvent = {
  event: string
  [key: string]: unknown
}

declare global {
  interface Window {
    dataLayer: DataLayerEvent[]
  }
}

export function pushEvent(data: DataLayerEvent): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

export function trackPageView(pagePath: string): void {
  pushEvent({
    event: 'page_view',
    page_path: pagePath,
  })
}

export function trackGenerateClick(category: string, cluster: string): void {
  pushEvent({
    event: 'generate_click',
    button_name: 'generate',
    category,
    cluster,
  })
}

export function trackGenerateSuccess(generationTimeMs: number): void {
  pushEvent({
    event: 'generate_success',
    generation_time_ms: generationTimeMs,
  })
}

export function trackGenerateFailed(errorType: string): void {
  pushEvent({
    event: 'generate_failed',
    error_type: errorType,
  })
}

export function trackOutputGenerated(category: string, cluster: string): void {
  pushEvent({
    event: 'output_generated',
    category,
    cluster,
  })
}

export function trackCopyToClipboard(category: string, cluster: string): void {
  pushEvent({
    event: 'copy_to_clipboard',
    category,
    cluster,
  })
}
```

### 3. `lib/utils.ts`

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 4. `data/constants.ts`

```typescript
import { Category, ToneOption } from '@/types'

export const categories: Category[] = [
  { id: 'crypto', label: 'Crypto', icon: 'crypto' },
  { id: 'politics', label: 'Politics', icon: 'briefcase' },
  { id: 'business', label: 'Business & Finance', icon: 'briefcase' },
  { id: 'technology', label: 'Technology', icon: 'settings' },
  { id: 'entertainment', label: 'Entertainment', icon: 'play-circle' },
]

export const toneOptions: ToneOption[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'spicy', label: 'Spicy' },
]
```

### 5. `data/mock-data.ts`

```typescript
import { NewsStory } from '@/types'

export const mockStories: NewsStory[] = [
  {
    id: 'crypto-1',
    categoryId: 'crypto',
    title: 'Bitcoin Surges Past $100K Milestone',
    description:
      'Bitcoin has broken through the $100,000 barrier for the first time, driven by institutional adoption and ETF approvals. Market analysts predict continued volatility.',
  },
  {
    id: 'crypto-2',
    categoryId: 'crypto',
    title: 'Ethereum 2.0 Staking Rewards Hit New Highs',
    description:
      'Ethereum staking yields have reached unprecedented levels following the latest network upgrade, attracting more validators to the ecosystem.',
  },
  {
    id: 'politics-1',
    categoryId: 'politics',
    title: 'New Climate Policy Announced',
    description:
      'Government unveils ambitious climate targets for 2030, including carbon neutrality goals and renewable energy investments.',
  },
  {
    id: 'politics-2',
    categoryId: 'politics',
    title: 'Trade Agreement Negotiations Progress',
    description:
      'International trade talks advance as major economies seek to resolve tariff disputes and establish new partnership frameworks.',
  },
  {
    id: 'business-1',
    categoryId: 'business',
    title: 'Tech Giants Report Record Earnings',
    description:
      'Major technology companies exceed quarterly expectations, driven by AI investments and cloud services growth.',
  },
  {
    id: 'business-2',
    categoryId: 'business',
    title: 'Global Supply Chain Recovery Accelerates',
    description:
      'Supply chain disruptions ease as logistics networks adapt and new manufacturing hubs emerge across Southeast Asia.',
  },
  {
    id: 'technology-1',
    categoryId: 'technology',
    title: 'AI Breakthrough in Natural Language Processing',
    description:
      'Researchers announce significant advances in AI language models, achieving near-human performance in complex reasoning tasks.',
  },
  {
    id: 'technology-2',
    categoryId: 'technology',
    title: 'Quantum Computing Reaches Commercial Milestone',
    description:
      'First commercial quantum computing service launches, offering businesses access to unprecedented computational power.',
  },
  {
    id: 'entertainment-1',
    categoryId: 'entertainment',
    title: 'Streaming Wars Intensify with New Launches',
    description:
      'Competition in the streaming market heats up as new platforms enter with exclusive content and competitive pricing.',
  },
  {
    id: 'entertainment-2',
    categoryId: 'entertainment',
    title: 'Award Season Predictions Heat Up',
    description:
      'Film critics and industry insiders share their predictions for upcoming award ceremonies, highlighting standout performances.',
  },
]
```

---

## UI Components

### 6. `app/globals.css`

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --font-sans: var(--font-inter);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

@layer base {
  :root {
    --radius: 0.625rem;
    --background: #0a0a0f;
    --foreground: #fafafa;
    --card: #16161d;
    --card-foreground: #fafafa;
    --popover: #16161d;
    --popover-foreground: #fafafa;
    --primary: #8f8fff;
    --primary-foreground: #ffffff;
    --secondary: #1e1e28;
    --secondary-foreground: #fafafa;
    --muted: #1e1e28;
    --muted-foreground: #888899;
    --accent: #1e1e28;
    --accent-foreground: #fafafa;
    --destructive: oklch(0.704 0.191 22.216);
    --border: #2a2a35;
    --input: #1e1e28;
    --ring: #8f8fff;
  }

  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), system-ui, sans-serif;
  }
}
```

### 7. `app/layout.tsx`

```typescript
import Script from "next/script";
import { GTM_ID } from "@/lib/gtm";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className="antialiased">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
```

### 8. `app/page.tsx`

```typescript
import { ContentGeneratorPage } from "@/components/content-generator-page";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <ContentGeneratorPage />
    </ErrorBoundary>
  );
}
```

### 9. `components/ui/accordion.tsx`

```typescript
"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

### 10. `components/ui/button.tsx`

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

### 11. `components/ui/select.tsx`

```typescript
"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-fit cursor-pointer items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
};
```

### 12. `components/ui/alert.tsx`

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "error";
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        variant === "error" && "border-red-500/50 bg-red-500/10 text-red-200",
        variant === "default" && "border-border bg-card text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}
```

---

## Feature Components

### 13. `components/background-gradient.tsx`

```typescript
export function BackgroundGradient() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[463px] -translate-x-1/2 size-[1038px]"
      aria-hidden
    >
      <div
        className="size-full rounded-full opacity-50 blur-[200px]"
        style={{
          background: "radial-gradient(circle, #8F8FFF 0%, #0A0A0F 100%)",
        }}
      />
    </div>
  );
}
```

### 14. `components/header.tsx`

```typescript
export function Header() {
  return (
    <header className="flex items-center gap-3 px-12 pt-6">
      <span className="text-lg tracking-tight text-[#b3b3c5]">
        Content Generator
      </span>
    </header>
  );
}
```

### 15. `components/icons/crypto-icon.tsx`

```typescript
export function CryptoIcon({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 7V17M9.5 7H13C14.3807 7 15.5 8.11929 15.5 9.5C15.5 10.8807 14.3807 12 13 12M9.5 12H13.5C14.8807 12 16 13.1193 16 14.5C16 15.8807 14.8807 17 13.5 17H9.5M9.5 12H8M9.5 17H8M11 5.5V7M13 5.5V7M11 17V18.5M13 17V18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### 16. `components/category-tab.tsx`

```typescript
import { Briefcase, Settings, PlayCircle } from "lucide-react";
import { CryptoIcon } from "@/components/icons/crypto-icon";
import { CategoryId } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crypto: ({ className }: { className?: string }) => (
    <CryptoIcon className={className} size={24} />
  ),
  briefcase: Briefcase,
  settings: Settings,
  "play-circle": PlayCircle,
};

interface CategoryTabProps {
  icon: string;
  label: string;
  categoryId: CategoryId;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryTab({
  icon,
  label,
  isActive,
  onClick,
}: CategoryTabProps) {
  const IconComponent = iconMap[icon] ?? Briefcase;

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-lg tracking-tight transition-all ${
        isActive
          ? "bg-primary text-white shadow-[0px_10px_15px_0px_rgba(143,143,255,0.2),0px_4px_6px_0px_rgba(143,143,255,0.2)]"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      <span
        className={`flex items-center justify-center size-6 rounded-full border ${
          isActive ? "border-white bg-primary" : "border-muted-foreground"
        }`}
      >
        <IconComponent className="size-3" />
      </span>
      {label}
    </button>
  );
}
```

### 17. `components/category-tabs.tsx`

```typescript
"use client";

import { CategoryTab } from "@/components/category-tab";
import { categories } from "@/data/constants";
import { CategoryId } from "@/types";

interface CategoryTabsProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {categories.map((cat) => (
        <CategoryTab
          key={cat.id}
          icon={cat.icon}
          label={cat.label}
          categoryId={cat.id}
          isActive={selectedCategory === cat.id}
          onClick={() => onSelectCategory(cat.id)}
        />
      ))}
    </div>
  );
}
```

### 18. `components/hero-section.tsx`

```typescript
import { CategoryTabs } from "@/components/category-tabs";
import { CategoryId } from "@/types";

interface HeroSectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function HeroSection({
  selectedCategory,
  onSelectCategory,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4">
        <h1
          className="bg-gradient-to-r from-white to-primary bg-clip-text text-center text-5xl font-semibold leading-[48px] tracking-tight text-transparent"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          AI
          <br />
          Content Generator
        </h1>
        <p className="max-w-[672px] text-center text-lg leading-7 tracking-tight text-muted-foreground">
          Generate compelling content from trending news across multiple
          categories. Select a topic, choose your tone, and let AI craft
          engaging narratives tailored to your needs.
        </p>
      </div>
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
}
```

### 19. `components/section-header.tsx`

```typescript
import { Briefcase, Settings, PlayCircle } from "lucide-react";
import { CryptoIcon } from "@/components/icons/crypto-icon";
import { CategoryId } from "@/types";

const iconMap: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  crypto: ({ className }) => <CryptoIcon size={16} className={className} />,
  politics: Briefcase,
  business: Briefcase,
  technology: Settings,
  entertainment: PlayCircle,
};

interface SectionHeaderProps {
  categoryId: CategoryId;
  categoryLabel: string;
}

export function SectionHeader({
  categoryId,
  categoryLabel,
}: SectionHeaderProps) {
  const Icon = iconMap[categoryId];

  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center size-12 rounded-full border-[1.5px] border-white">
        <Icon className="size-4 text-white" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Trending in {categoryLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select a news story to generate content
        </p>
      </div>
    </div>
  );
}
```

### 20. `components/tone-selector.tsx`

```typescript
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toneOptions } from "@/data/constants";
import { ToneOfVoice } from "@/types";

interface ToneSelectorProps {
  value: ToneOfVoice;
  onChange: (value: ToneOfVoice) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">
        Tone of Voice
      </label>
      <Select value={value} onValueChange={(v) => onChange(v as ToneOfVoice)}>
        <SelectTrigger className="h-[50px] w-full rounded-[10px] border-border bg-input px-6 text-base text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-[10px] border-border bg-card">
          {toneOptions.map((tone) => (
            <SelectItem key={tone.value} value={tone.value}>
              {tone.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

### 21. `components/generate-button.tsx`

```typescript
"use client";

import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      data-action="generate"
      className="h-12 w-full rounded-[10px] bg-primary text-base font-normal text-white hover:bg-primary/90"
    >
      {isLoading ? "Generating..." : "Generate Content"}
    </Button>
  );
}
```

### 22. `components/generated-content.tsx`

```typescript
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToneOfVoice } from "@/types";
import { trackCopyToClipboard } from "@/lib/gtm";

interface GeneratedContentProps {
  content: string;
  tone: ToneOfVoice;
  category: string;
  cluster: string;
}

export function GeneratedContent({
  content,
  tone,
  category,
  cluster,
}: GeneratedContentProps) {
  const [copied, setCopied] = useState(false);
  const toneLabel = tone.charAt(0).toUpperCase() + tone.slice(1);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    trackCopyToClipboard(category, cluster);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-border bg-[rgba(30,30,40,0.5)] px-6 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">
          Generated Content ({toneLabel} Tone)
        </h4>
        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="whitespace-pre-wrap text-base leading-[26px] tracking-tight text-foreground/90">
        {content}
      </div>
    </div>
  );
}
```

### 23. `components/news-card.tsx`

```typescript
"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ToneSelector } from "@/components/tone-selector";
import { GenerateButton } from "@/components/generate-button";
import { GeneratedContent } from "@/components/generated-content";
import { NewsStory, ToneOfVoice } from "@/types";

interface NewsCardProps {
  story: NewsStory;
  selectedTone: ToneOfVoice;
  onToneChange: (tone: ToneOfVoice) => void;
  onGenerate: () => void;
  generatedContent?: string;
  generatedTone?: ToneOfVoice;
  isGenerating?: boolean;
  isExpanded?: boolean;
}

export function NewsCard({
  story,
  selectedTone,
  onToneChange,
  onGenerate,
  generatedContent,
  generatedTone,
  isGenerating,
  isExpanded,
}: NewsCardProps) {
  return (
    <AccordionItem
      value={story.id}
      className={`rounded-[10px] border-0 transition-all ${
        isExpanded
          ? "border-2 border-primary bg-card shadow-[0px_10px_15px_0px_rgba(143,143,255,0.1),0px_4px_6px_0px_rgba(143,143,255,0.1)]"
          : "border border-border bg-card"
      }`}
    >
      <AccordionTrigger className="items-center px-6 py-5 hover:no-underline [&>svg]:size-5">
        <span className="text-base font-normal tracking-tight text-foreground">
          {story.title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <p className="text-base leading-[26px] tracking-tight text-muted-foreground">
            {story.description}
          </p>
          <ToneSelector value={selectedTone} onChange={onToneChange} />
          <GenerateButton onClick={onGenerate} isLoading={isGenerating} />
          {generatedContent && generatedTone && (
            <GeneratedContent
              content={generatedContent}
              tone={generatedTone}
              category={story.categoryId}
              cluster={story.title}
            />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

### 24. `components/news-card-list.tsx`

```typescript
"use client";

import { Accordion } from "@/components/ui/accordion";
import { NewsCard } from "@/components/news-card";
import { NewsStory, ToneOfVoice } from "@/types";

interface NewsCardListProps {
  stories: NewsStory[];
  expandedCardId: string | undefined;
  onExpandChange: (id: string | undefined) => void;
  selectedTones: Record<string, ToneOfVoice>;
  onToneChange: (storyId: string, tone: ToneOfVoice) => void;
  onGenerate: (storyId: string) => void;
  generatedContents: Record<string, { content: string; tone: ToneOfVoice }>;
  generatingStoryId: string | null;
}

export function NewsCardList({
  stories,
  expandedCardId,
  onExpandChange,
  selectedTones,
  onToneChange,
  onGenerate,
  generatedContents,
  generatingStoryId,
}: NewsCardListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      value={expandedCardId}
      onValueChange={onExpandChange}
      className="flex flex-col gap-4"
    >
      {stories.map((story) => {
        const generatedData = generatedContents[story.id];
        return (
          <NewsCard
            key={story.id}
            story={story}
            selectedTone={selectedTones[story.id] ?? "neutral"}
            onToneChange={(tone) => onToneChange(story.id, tone)}
            onGenerate={() => onGenerate(story.id)}
            generatedContent={generatedData?.content}
            generatedTone={generatedData?.tone}
            isGenerating={generatingStoryId === story.id}
            isExpanded={expandedCardId === story.id}
          />
        );
      })}
    </Accordion>
  );
}
```

### 25. `components/error-boundary.tsx`

```typescript
'use client';

import { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="error" className="max-w-lg">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reload Page
              </button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 26. `components/content-generator-page.tsx`

```typescript
"use client";

import { useState, useMemo, useEffect } from "react";
import { BackgroundGradient } from "@/components/background-gradient";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { NewsCardList } from "@/components/news-card-list";
import { categories } from "@/data/constants";
import { mockStories } from "@/data/mock-data";
import { CategoryId, ToneOfVoice, NewsStory } from "@/types";
import {
  trackPageView,
  trackOutputGenerated,
  trackGenerateClick,
  trackGenerateSuccess,
  trackGenerateFailed,
} from "@/lib/gtm";

const MOCK_GENERATED_CONTENT = `Breaking developments continue to reshape the landscape as key stakeholders respond to emerging trends. Industry analysts point to sustained momentum amid evolving market conditions.

Key highlights:
• Strong institutional interest driving momentum
• Regulatory clarity expected to boost confidence
• Market participants remain cautiously optimistic

The trajectory suggests continued growth opportunities for engaged participants.`;

export function ContentGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("crypto");
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>(undefined);
  const [selectedTones, setSelectedTones] = useState<Record<string, ToneOfVoice>>({});
  const [generatedContents, setGeneratedContents] = useState<
    Record<string, { content: string; tone: ToneOfVoice }>
  >({});
  const [generatingStoryId, setGeneratingStoryId] = useState<string | null>(null);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const filteredStories = useMemo(
    () => mockStories.filter((s) => s.categoryId === selectedCategory),
    [selectedCategory]
  );

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  function handleToneChange(storyId: string, tone: ToneOfVoice) {
    setSelectedTones((prev) => ({ ...prev, [storyId]: tone }));
  }

  async function handleGenerate(storyId: string) {
    const story = mockStories.find((s) => s.id === storyId);
    if (!story) return;
    if (generatingStoryId === storyId) return;

    setGeneratingStoryId(storyId);
    const tone = selectedTones[storyId] ?? "neutral";

    trackGenerateClick(story.categoryId, story.title);
    const startTime = performance.now();

    try {
      // Simulate API delay (800-1500ms)
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 700)
      );

      const generationTimeMs = Math.round(performance.now() - startTime);
      trackGenerateSuccess(generationTimeMs);
      trackOutputGenerated(story.categoryId, story.title);

      setGeneratedContents((prev) => ({
        ...prev,
        [storyId]: { content: MOCK_GENERATED_CONTENT, tone },
      }));
    } catch (error) {
      trackGenerateFailed("MOCK_ERROR");
    } finally {
      setGeneratingStoryId(null);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundGradient />
      <div className="relative z-10">
        <Header />
        <main className="mx-auto max-w-[1096px] px-4">
          <div className="pt-[100px] pb-16">
            <HeroSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="flex flex-col gap-8 pb-24">
            <SectionHeader
              categoryId={selectedCategory}
              categoryLabel={currentCategory?.label ?? "Crypto"}
            />
            <NewsCardList
              stories={filteredStories}
              expandedCardId={expandedCardId}
              onExpandChange={setExpandedCardId}
              selectedTones={selectedTones}
              onToneChange={handleToneChange}
              onGenerate={handleGenerate}
              generatedContents={generatedContents}
              generatingStoryId={generatingStoryId}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

## Environment Setup

Add to `.env.local`:

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## Testing GTM Events

1. **Browser Console**: Type `window.dataLayer` to view pushed events
2. **GTM Preview**: Tag Assistant → Enter URL → Verify tags fire
3. **GA4 Realtime**: Reports → Realtime → Confirm events appear

---

## GTM Events Tracked

| Event               | Trigger                  | Parameters                           |
| ------------------- | ------------------------ | ------------------------------------ |
| `page_view`         | Page load                | `page_path`                          |
| `generate_click`    | Click generate button    | `button_name`, `category`, `cluster` |
| `generate_success`  | Mock generation complete | `generation_time_ms`                 |
| `generate_failed`   | Generation error         | `error_type`                         |
| `output_generated`  | Content displayed        | `category`, `cluster`                |
| `copy_to_clipboard` | Click copy button        | `category`, `cluster`                |

---

## Implementation Checklist

- [ ] Install dependencies (radix-ui, lucide-react, tailwind-merge, clsx, class-variance-authority)
- [ ] Create types in `types/index.ts`
- [ ] Create `lib/gtm.ts` and `lib/utils.ts`
- [ ] Create `data/constants.ts` and `data/mock-data.ts`
- [ ] Create UI components in `components/ui/`
- [ ] Create feature components
- [ ] Create `app/layout.tsx` with GTM script
- [ ] Create `app/page.tsx` and `app/globals.css`
- [ ] Add `NEXT_PUBLIC_GTM_ID` to environment
- [ ] Test events in browser console

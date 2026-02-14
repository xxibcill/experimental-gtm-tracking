# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) project demonstrating comprehensive Google Tag Manager (GTM) implementation patterns. The project showcases various tracking scenarios including ecommerce, scroll depth, video engagement, and user interaction tracking.

## Commands

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Environment Variables

- `NEXT_PUBLIC_GTM_ID` - GTM container ID (defaults to `GTM-XXXXXXX` if not set)

## Architecture

### GTM Core (`lib/gtm.ts`)

The central module providing TypeScript-safe utilities for interacting with the GTM dataLayer:

- **Core Functions**: `pushEvent()`, `trackEvent()`, `initDataLayer()`
- **Generic Tracking**: `trackButtonClick()`, `trackExternalLink()`, `trackFormSubmit()`, `trackPageView()`
- **Specialized Tracking**: `trackScrollDepth()`, `trackVideoEvent()`, `trackUserEngagement()`, `trackError()`
- **Ecommerce Module**: `ecommerce.trackProductImpression()`, `trackProductClick()`, `trackAddToCart()`, `trackRemoveFromCart()`, `trackCheckoutStep()`, `trackPurchase()`
- **Utilities**: `setUserProperties()`, `initErrorTracking()`

### Layout Integration (`app/layout.tsx`)

The root layout injects GTM scripts in the `<head>`:
- Loads GTM script asynchronously
- Initializes `dataLayer` and `gtag` function
- Sets up global error handlers for JavaScript errors and unhandled promise rejections
- Includes noscript fallback for browsers without JS

### Demo Pages

| Route | Purpose |
|-------|---------|
| `/tracking-demo` | Form tracking, custom events, button clicks |
| `/ecommerce` | Full ecommerce funnel: product listings, cart, checkout, purchase |
| `/scroll-tracking` | Scroll depth tracking (25%, 50%, 75%, 100%) |
| `/video-tracking` | Video engagement (play, pause, complete, progress, seek) |
| `/user-engagement` | User engagement metrics |

## Key Patterns

1. **Client Components**: All tracking demo pages use `"use client"` since they interact with `window.dataLayer`
2. **Data Attributes**: HTML elements use `data-gtm-*` attributes (category, action, label) for GTM CSS selector triggers
3. **Server-Side GTM**: The GTM script loads from the server in `layout.tsx` for performance
4. **Safe Execution**: All tracking functions check `typeof window !== "undefined"` before accessing browser APIs

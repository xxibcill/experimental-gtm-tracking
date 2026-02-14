# Google Tag Manager Setup Guide

This guide walks you through setting up Google Tag Manager for this project.

## Prerequisites

- A Google account
- Access to the deployed website URL

---

## Step 1: Create a GTM Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **Create Account**
3. Fill in the details:
   - **Account Name**: Your company or project name
   - **Country**: Your location
4. Click **Continue**

## Step 2: Set Up a Container

1. Enter a **Container Name** (e.g., "GTM Learning Project")
2. Select **Web** as the target platform
3. Click **Create**
4. Accept the Terms of Service

## Step 3: Install the GTM Container

You will see the container installation code. There are two snippets:

### Option A: For Development (Local Testing)

If you want to test locally, create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual container ID (found in your GTM snippet).

The project already has GTM integration in `app/layout.tsx`, so it will automatically load your container.

### Option B: For Production

Deploy your site with the environment variable set in your hosting platform (Vercel, Netlify, etc.).

## Step 4: Configure Tags in GTM Dashboard

### 4.1 Create a GA4 Configuration Tag

1. Click **Tags** → **New**
2. **Tag Configuration**: Select **Google Analytics: GA4 Configuration**
3. **Measurement ID**: Enter your GA4 Measurement ID (G-XXXXXXXXXX)
4. **Trigger**: Select **All Pages**
5. Name it "GA4 - Configuration"
6. Click **Save**

### 4.2 Create a GA4 Event Tag for Button Clicks

1. Click **Tags** → **New**
2. **Tag Configuration**: Select **Google Analytics: GA4 Event**
3. **Configuration Tag**: Select "GA4 - Configuration" (or create a new one)
4. **Event Name**: `button_click`
5. **More Settings** → **Ecommerce**: Select "Use data layer"
6. **Trigger**: Click + to create a new trigger
7. **Trigger Configuration**: Select **Custom Event**
8. **Event Name**: `button_click`
9. Name it "GA4 - Button Click"
10. Click **Save**

### 4.3 Create Tags for Ecommerce Events

Repeat the process for these events:

| Event Name | Trigger Event | Description |
|------------|---------------|-------------|
| `view_item_list` | `view_item_list` | Product impressions |
| `select_item` | `select_item` | Product clicks |
| `add_to_cart` | `add_to_cart` | Add to cart |
| `remove_from_cart` | `remove_from_cart` | Remove from cart |
| `begin_checkout` | `begin_checkout` | Checkout started |
| `purchase` | `purchase` | Purchase completed |

### 4.4 Create a Scroll Tracking Tag

1. **Tag Configuration**: **Google Analytics: GA4 Event**
2. **Event Name**: `scroll_depth`
3. **Trigger**: Create **Custom Event** with event name `scroll_depth`

### 4.5 Create a Video Tracking Tag

1. **Tag Configuration**: **Google Analytics: GA4 Event**
2. **Event Name**: `video_engagement`
3. **Trigger**: Create **Custom Event** with event name `video_engagement`

### 4.6 Create a Form Submission Tag

1. **Tag Configuration**: **Google Analytics: GA4 Event**
2. **Event Name**: `form_submit`
3. **Trigger**: Create **Custom Event** with event name `form_submit`

### 4.7 Create an Error Tracking Tag

1. **Tag Configuration**: **Google Analytics: GA4 Event**
2. **Event Name**: `js_error`
3. **Trigger**: Create **Custom Event** with event name `js_error`

## Step 5: Set Up Triggers Using Data Attributes

The project uses `data-gtm-*` attributes for easier trigger configuration:

```html
<button
  data-gtm-category="ecommerce"
  data-gtm-action="add_to_cart"
  data-gtm-label="PROD-001"
>
  Add to Cart
</button>
```

### Create a CSS Trigger (Alternative to Custom Events)

1. Go to **Triggers** → **New**
2. **Trigger Configuration**: **CSS Selector**
3. **Selector**: `[data-gtm-category]`
4. **Fire On**: All elements matching `[data-gtm-category]`
5. Create three built-in variables for each trigger:
   - `{{Data Layer - gtm.category}}` (from element attribute `data-gtm-category`)
   - `{{Data Layer - gtm.action}}` (from element attribute `data-gtm-action`)
   - `{{Data Layer - gtm.label}}` (from element attribute `data-gtm-label`)

## Step 6: Preview and Test

1. Click **Preview** in the GTM dashboard
2. Enter your site's URL
3. Interact with the site
4. Check the **GA4 DebugView** in Google Analytics to verify events are firing

## Step 7: Publish

1. Click **Submit** in the GTM dashboard
2. Add a version name (e.g., "Initial setup")
3. Click **Publish**

---

## Event Reference

This project fires these events to the dataLayer:

### Core Events
- `button_click` - Button interactions
- `external_link_click` - External link clicks
- `form_submit` - Form submissions
- `page_view` - Page views

### Ecommerce Events
- `view_item_list` - Product listing viewed
- `select_item` - Product clicked
- `add_to_cart` - Product added to cart
- `remove_from_cart` - Product removed from cart
- `begin_checkout` - Checkout started
- `purchase` - Purchase completed

### Engagement Events
- `scroll_depth` - Scroll milestones (25%, 50%, 75%, 100%)
- `video_engagement` - Video interactions
- `user_engagement` - User engagement metrics

### Error Events
- `js_error` - JavaScript errors

---

## Troubleshooting

### Events Not Firing

1. Check the browser console for dataLayer messages
2. Verify GTM preview mode is connected
3. Ensure triggers are configured correctly
4. Check GA4 DebugView for event reception

### GTM Not Loading

1. Verify `NEXT_PUBLIC_GTM_ID` is set correctly
2. Check the container ID matches exactly
3. Ensure the script is not blocked by ad blockers

### Data Not Appearing in GA4

1. Verify GA4 Measurement ID is correct
2. Check GA4 DebugView
3. Ensure configuration tag is set up as "All Pages"

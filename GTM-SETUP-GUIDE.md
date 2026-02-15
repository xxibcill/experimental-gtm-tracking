# Google Tag Manager Setup Guide

This guide walks you through setting up Google Tag Manager for this Next.js project with comprehensive tracking capabilities.

## Prerequisites

- A Google account
- A Google Analytics 4 (GA4) property and Measurement ID
- Access to the deployed website URL (or localhost for testing)

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
5. Copy your **Container ID** (format: `GTM-XXXXXXX`)

## Step 3: Install the GTM Container

The project already has GTM integration built into [app/layout.tsx](app/layout.tsx). You just need to configure your container ID:

### Option A: For Development (Local Testing)

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual container ID.

### Option B: For Production

Deploy your site with the environment variable set in your hosting platform (Vercel, Netlify, etc.):

- **Environment Variable**: `NEXT_PUBLIC_GTM_ID`
- **Value**: Your GTM container ID (e.g., `GTM-XXXXXXX`)

### How It Works

The GTM integration in [app/layout.tsx](app/layout.tsx):
- Loads the GTM script with `afterInteractive` strategy for optimal performance
- Initializes `window.dataLayer` and `window.gtag` function
- Sets up global error tracking for JavaScript errors and unhandled promise rejections
- Includes a noscript fallback for browsers without JavaScript enabled

## Step 4: Configure Tags in GTM Dashboard

### 4.1 Create a GA4 Configuration Tag

1. In GTM, click **Tags** → **New**
2. **Tag Configuration**: Select **Google Analytics: GA4 Configuration**
3. **Measurement ID**: Enter your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
4. **Trigger**: Select **All Pages**
5. Name it "GA4 - Configuration"
6. Click **Save**

### 4.2 Create GA4 Event Tags

The project uses custom events pushed to the dataLayer. For each event below, create a GA4 Event Tag:

1. Click **Tags** → **New**
2. **Tag Configuration**: Select **Google Analytics: GA4 Event**
3. **Configuration Tag**: Select "GA4 - Configuration"
4. **Event Name**: Enter the event name from the table below
5. **Event Parameters**: Click "Add Row" and select "Use data layer" to automatically capture all event parameters
6. **Trigger**: Create a **Custom Event** trigger with the matching event name
7. Name the tag appropriately (e.g., "GA4 - Button Click")
8. Click **Save**

#### Core Events

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `button_click` | Button interactions | `button_name`, `button_text`, `button_location` |
| `external_link_click` | External link clicks | `link_url`, `link_text`, `link_domain` |
| `form_submit` | Form submissions | `form_name`, `form_id` |
| `page_view` | Custom page views | `page_path`, `page_title` |

#### Ecommerce Events (GA4 Enhanced Ecommerce)

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `view_item_list` | Product list viewed | `ecommerce.items[]` |
| `select_item` | Product clicked | `ecommerce.items[]` |
| `add_to_cart` | Product added to cart | `ecommerce.value`, `ecommerce.currency`, `ecommerce.items[]` |
| `remove_from_cart` | Product removed from cart | `ecommerce.value`, `ecommerce.currency`, `ecommerce.items[]` |
| `begin_checkout` | Checkout started | `ecommerce.items[]`, `ecommerce.checkout_step` |
| `purchase` | Purchase completed | `ecommerce.transaction_id`, `ecommerce.value`, `ecommerce.tax`, `ecommerce.shipping`, `ecommerce.currency`, `ecommerce.items[]` |

#### Engagement Events

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `scroll_depth` | Scroll milestones | `scroll_depth`, `scroll_depth_unit`, `page_path` |
| `video_engagement` | Video interactions | `video_id`, `video_title`, `video_status`, `video_progress` |
| `user_engagement` | User engagement metrics | `engagement_time_seconds`, `engagement_score` |

#### Content Generator Events (New)

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `generate_click` | Generate button clicked | `button_name`, `category`, `cluster` |
| `generate_success` | Content generated successfully | `generation_time_ms` |
| `generate_failed` | Content generation failed | `error_type` |
| `output_generated` | Output displayed | `category`, `cluster` |
| `copy_to_clipboard` | Copied to clipboard | `category`, `cluster` |

#### Error Events

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `js_error` | JavaScript errors | `error_message`, `error_stack`, `error_lineno`, `error_colno`, `error_source` |

### Quick Tag Setup (Recommended)

Instead of creating tags individually, you can create a **single GA4 Event tag** that fires on all custom events:

1. **Tag Configuration**: Google Analytics: GA4 Event
2. **Configuration Tag**: GA4 - Configuration
3. **Event Name**: `{{Event}}`
4. **Event Parameters**: Use data layer
5. **Trigger**: Custom Event with event name matching regex: `.*`
6. Name it "GA4 - All Custom Events"

This single tag will handle all custom events from the dataLayer.

## Step 5: Preview and Test

### Testing Locally

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. In GTM, click **Preview** button
3. Enter `http://localhost:3000` in the "Your website's URL" field
4. Click **Connect**
5. A new tab will open with Tag Assistant connected

### Testing the Demo Pages

Navigate through the demo pages to test different tracking scenarios:

| Page | URL | What to Test |
|------|-----|-------------|
| Home | `/` | Navigation links |
| Tracking Demo | `/tracking-demo` | Form submissions, button clicks, custom events |
| Ecommerce | `/ecommerce` | Product impressions, add to cart, checkout flow |
| Scroll Tracking | `/scroll-tracking` | Scroll depth events at 25%, 50%, 75%, 100% |
| Video Tracking | `/video-tracking` | Video play, pause, progress, seek, complete |
| User Engagement | `/user-engagement` | Engagement time and score |
| Content Generator | `/content-generator` | Generate clicks, success/failure, copy actions |

### Verify in GA4 DebugView

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to **Configure** → **DebugView**
4. Interact with your site
5. Verify events appear in real-time with correct parameters

## Step 6: Publish Your Container

Once testing is complete:

1. Click **Submit** in the GTM dashboard
2. Add a version name (e.g., "Initial setup with all events")
3. Add a description of changes
4. Click **Publish**

---

## Project Architecture

### GTM Utility Module ([lib/gtm.ts](lib/gtm.ts))

The project provides TypeScript-safe GTM utilities:

#### Core Functions
- `initDataLayer()` - Initialize the dataLayer array
- `pushEvent(eventName, eventParams)` - Push any event to dataLayer
- `trackEvent(eventName, parameters)` - Track custom events

#### Generic Tracking Functions
- `trackButtonClick(buttonName, buttonText?, buttonLocation?)`
- `trackExternalLink(url, linkText?)`
- `trackFormSubmit(formName, formId?)`
- `trackPageView(pagePath, pageTitle, customParams?)`

#### Specialized Tracking Functions
- `trackScrollDepth(depth, pagePath)` - Track scroll milestones
- `trackVideoEvent(videoId, videoTitle, status, progress?)` - Track video interactions
- `trackUserEngagement(engagementTime, engagementScore?)` - Track user engagement
- `trackError(errorMessage, errorStack?)` - Track JavaScript errors

#### Ecommerce Module (`ecommerce.*`)
- `trackProductImpression(products[])` - Track product list views
- `trackProductClick(product, position?)` - Track product clicks
- `trackAddToCart(product, value?, currency?)` - Track add to cart
- `trackRemoveFromCart(product, value?, currency?)` - Track cart removals
- `trackCheckoutStep(step, stepName, products[], option?)` - Track checkout
- `trackPurchase(transactionId, products[], revenue, tax?, shipping?, currency?)` - Track purchases

#### Content Generator Functions (New)
- `trackGenerateClick(category, cluster)` - Track generate button clicks
- `trackGenerateSuccess(generationTimeMs)` - Track successful generation
- `trackGenerateFailed(errorType)` - Track failed generation
- `trackOutputGenerated(category, cluster)` - Track output display
- `trackCopyToClipboard(category, cluster)` - Track clipboard copy

#### Utility Functions
- `setUserProperties(userId, userProperties?)` - Set user properties
- `initErrorTracking()` - Set up global error handlers

### Usage Example

```typescript
import { trackButtonClick, ecommerce } from "@/lib/gtm";

// Track a button click
trackButtonClick("cta_button", "Sign Up Now", "hero_section");

// Track add to cart
ecommerce.trackAddToCart({
  id: "PROD-001",
  name: "Premium Widget",
  brand: "WidgetCo",
  category: "Widgets",
  price: 49.99,
  quantity: 1
});
```

---

## Troubleshooting

### Events Not Firing

1. **Check the browser console**:
   - Open DevTools (F12)
   - Look for dataLayer messages
   - Type `window.dataLayer` to inspect all events

2. **Verify GTM preview mode**:
   - Ensure Tag Assistant is connected
   - Check if events appear in the Tag Assistant panel
   - Look for tags firing in the Summary view

3. **Check triggers**:
   - Verify trigger configuration matches event names exactly
   - Ensure trigger conditions are met
   - Check for regex errors in custom event triggers

4. **Verify in GA4 DebugView**:
   - Go to Configure → DebugView in GA4
   - Ensure events appear with correct parameters
   - Check if events are being filtered out

### GTM Container Not Loading

1. **Check environment variable**:
   ```bash
   # Verify in .env.local
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Must match your container ID exactly
   ```

2. **Restart development server** after changing `.env.local`:
   ```bash
   pnpm dev
   ```

3. **Check browser console** for errors:
   - Look for network errors loading GTM script
   - Check if ad blockers are blocking GTM
   - Verify the container ID in the loaded script URL

4. **Inspect page source**:
   - View page source (Ctrl/Cmd + U)
   - Search for `googletagmanager.com`
   - Verify the GTM script is present

### Data Not Appearing in GA4

1. **Verify GA4 Configuration Tag**:
   - Ensure Measurement ID is correct (format: `G-XXXXXXXXXX`)
   - Check that trigger is set to "All Pages"
   - Verify tag is firing in GTM Preview mode

2. **Check GA4 DebugView first**:
   - DebugView shows events in real-time
   - Standard reports can take 24-48 hours to populate
   - Verify events show correct parameter names and values

3. **Common issues**:
   - Measurement ID typo
   - Configuration tag not firing
   - Events firing before configuration tag loads
   - AdBlockers preventing GA4 script

### Events Showing in GTM but Not GA4

1. **Check ecommerce events**:
   - Ensure "Use data layer" is selected in GA4 Event tag settings
   - Verify `ecommerce` object structure matches GA4 format
   - Check that item parameters use `item_id`, `item_name` (not `id`, `name`)

2. **Check event parameters**:
   - GA4 has limits on parameter names and values
   - Parameter names must be ≤ 40 characters
   - Parameter values must be ≤ 100 characters
   - Some parameter names are reserved

3. **Verify tag configuration**:
   - Ensure GA4 Event tag references the GA4 Configuration tag
   - Check that event name doesn't have typos
   - Verify trigger is firing correctly

### TypeScript Errors

If you see TypeScript errors when using GTM functions:

```typescript
// Ensure you import from the correct path
import { trackButtonClick } from "@/lib/gtm";

// For ecommerce functions, use the ecommerce object
import { ecommerce } from "@/lib/gtm";
ecommerce.trackAddToCart({ /* ... */ });
```

---

## Advanced Configuration

### Custom Dimensions and Metrics

To track custom dimensions in GA4:

1. In GA4, go to **Configure** → **Custom Definitions**
2. Create custom dimensions (e.g., user_role, content_category)
3. Pass them as parameters in your events:

```typescript
import { trackEvent } from "@/lib/gtm";

trackEvent("custom_action", {
  user_role: "premium",
  content_category: "video",
  custom_metric: 42
});
```

### User Properties

Set user-level properties for segmentation:

```typescript
import { setUserProperties } from "@/lib/gtm";

setUserProperties("user_12345", {
  user_type: "premium",
  signup_date: "2026-01-15",
  preferred_language: "en"
});
```

### Server-Side Tagging (Advanced)

For enhanced data privacy and performance:

1. Set up Google Cloud Platform server container
2. Configure server-side GTM container
3. Update client-side container to send to server endpoint
4. Benefits: First-party cookies, better ad blocker resilience, data transformation

---

## Best Practices

1. **Use consistent naming conventions**:
   - Use snake_case for event names and parameters (GA4 standard)
   - Be descriptive: `product_add_to_cart` not `click1`

2. **Limit dataLayer size**:
   - Don't push entire objects if only a few properties are needed
   - Clean up old dataLayer items if building a SPA

3. **Test before deploying**:
   - Always use GTM Preview mode before publishing
   - Verify in GA4 DebugView
   - Check for JavaScript errors in console

4. **Document your events**:
   - Keep a spreadsheet of all events and parameters
   - Document what each event tracks and why
   - Share with stakeholders

5. **Version control**:
   - Name GTM versions descriptively
   - Add detailed version descriptions
   - Consider using GTM workspace for major changes

6. **Performance**:
   - The project uses `strategy="afterInteractive"` for optimal load performance
   - GTM loads asynchronously and won't block page rendering
   - Avoid pushing too many events on page load

---

## Next Steps

Once your GTM setup is complete:

1. **Set up GA4 Conversions**:
   - Go to GA4 → Configure → Events
   - Mark important events as conversions (e.g., `purchase`, `form_submit`)

2. **Create Audiences**:
   - Use event parameters to build audiences
   - Example: Users who viewed products but didn't purchase

3. **Set up Goals and Funnels**:
   - Create exploration reports for conversion funnels
   - Track drop-off points in checkout flow

4. **Connect to Google Ads** (if applicable):
   - Link GA4 to Google Ads account
   - Import conversions for campaign optimization

5. **Set up Alerts**:
   - Configure custom alerts for important metrics
   - Get notified of sudden drops in conversions or traffic

---

## Resources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Ecommerce Implementation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GTM Server-Side Tagging](https://developers.google.com/tag-platform/tag-manager/server-side)
- [Next.js GTM Integration](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)

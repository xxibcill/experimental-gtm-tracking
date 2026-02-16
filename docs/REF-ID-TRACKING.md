# Referral ID (ref_id) Tracking

This document explains the referral ID tracking system implemented in this project.

## Overview

The `ref_id` tracking system automatically captures and persists referral identifiers across user sessions. Every GTM event includes the `ref_id` parameter, enabling comprehensive attribution tracking.

## How It Works

### 1. First Visit with ref_id

When a user visits your site with a `ref_id` query parameter:

```
https://yoursite.com?ref_id=abc123
```

The system:
1. Extracts `abc123` from the URL
2. Stores it in `localStorage` under the key `gtm_ref_id`
3. Automatically includes it in all GTM events

### 2. Subsequent Visits

When the user returns to your site (even without the ref_id parameter):

```
https://yoursite.com
```

The system:
1. Retrieves the stored `ref_id` from localStorage
2. Continues including it in all GTM events
3. Maintains attribution across browser sessions

### 3. Updating ref_id

If a user visits with a different `ref_id`:

```
https://yoursite.com?ref_id=xyz789
```

The new value overwrites the previous one in localStorage.

## Architecture

### Core Files

#### [lib/ref-id.ts](lib/ref-id.ts)

Contains core utilities for ref_id management:

- `initRefId()` - Initialize tracking on app load
- `getCurrentRefId()` - Get the current ref_id
- `extractRefIdFromUrl()` - Parse URL for ref_id parameter
- `getStoredRefId()` - Retrieve from localStorage
- `storeRefId()` - Save to localStorage
- `clearRefId()` - Remove from localStorage (useful for testing)

#### [hooks/use-ref-id.ts](hooks/use-ref-id.ts)

React hook that initializes ref_id tracking:

```typescript
export function useRefId() {
  useEffect(() => {
    const refId = initRefId();
    console.log('[RefID] Initialized:', refId);
  }, []);
}
```

#### [components/ref-id-provider.tsx](components/ref-id-provider.tsx)

Client component that wraps the app and initializes tracking:

```tsx
export function RefIdProvider({ children }: { children: React.ReactNode }) {
  useRefId();
  return <>{children}</>;
}
```

#### [lib/gtm.ts](lib/gtm.ts) (Modified)

The `pushEvent()` function automatically includes ref_id:

```typescript
export function pushEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== "undefined") {
    const refId = getCurrentRefId();
    window.dataLayer.push({
      event: eventName,
      ref_id: refId,  // Automatically included
      ...eventParams,
    });
  }
}
```

## Usage Examples

### Checking Current ref_id

In the browser console:

```javascript
// Check localStorage directly
localStorage.getItem('gtm_ref_id')

// Check dataLayer events
window.dataLayer
  .filter(event => event.event)
  .map(event => ({ event: event.event, ref_id: event.ref_id }))
```

### Testing Different Scenarios

#### Scenario 1: New User with ref_id

1. Open incognito/private browsing window
2. Visit: `http://localhost:3000?ref_id=partner123`
3. Open console - should see: `[RefID] Tracking initialized with ref_id: partner123`
4. Navigate to `/ecommerce` and click "Add to Cart"
5. Check dataLayer - `add_to_cart` event should include `ref_id: partner123`

#### Scenario 2: Returning User

1. Continue from Scenario 1 (same browser session)
2. Visit: `http://localhost:3000` (no ref_id parameter)
3. Console should still show: `[RefID] Tracking initialized with ref_id: partner123`
4. All events continue to include `ref_id: partner123`

#### Scenario 3: Updating ref_id

1. Continue from previous scenario
2. Visit: `http://localhost:3000?ref_id=campaign456`
3. Console shows: `[RefID] Tracking initialized with ref_id: campaign456`
4. New ref_id replaces the old one
5. All subsequent events include `ref_id: campaign456`

#### Scenario 4: User Without ref_id

1. Open new incognito window
2. Visit: `http://localhost:3000` (no ref_id parameter)
3. Console shows: `[RefID] No ref_id found in URL or localStorage`
4. All events include `ref_id: null`

### Programmatic Access

If you need to access the ref_id in your components:

```typescript
import { getCurrentRefId } from '@/lib/ref-id';

function MyComponent() {
  const handleClick = () => {
    const refId = getCurrentRefId();
    console.log('Current ref_id:', refId);

    // Use in your logic
    if (refId === 'vip_partner') {
      // Show special offer
    }
  };

  return <button onClick={handleClick}>Check RefID</button>;
}
```

## Use Cases

### 1. Affiliate Marketing

Track which affiliate partner brought the user:

```
https://yoursite.com?ref_id=affiliate_john
https://yoursite.com?ref_id=affiliate_jane
```

In GTM/GA4, you can:
- Analyze conversion rates by affiliate
- Calculate commission per partner
- Identify top-performing affiliates

### 2. Marketing Campaign Attribution

Track campaign effectiveness:

```
https://yoursite.com?ref_id=email_campaign_2026_01
https://yoursite.com?ref_id=facebook_ad_winter_sale
https://yoursite.com?ref_id=google_ads_brand_keywords
```

### 3. Referral Programs

Track user-to-user referrals:

```
https://yoursite.com?ref_id=user_12345
```

Reward users when their referred friends make purchases.

### 4. Partner Integrations

Track which integration partner drove the user:

```
https://yoursite.com?ref_id=partner_shopify
https://yoursite.com?ref_id=partner_stripe
```

## GTM Configuration

### Creating a ref_id Custom Dimension in GA4

1. Go to GA4 → Configure → Custom Definitions
2. Click "Create custom dimension"
3. Settings:
   - Dimension name: `Referral ID`
   - Scope: `User`
   - Description: `Referral identifier from URL or localStorage`
   - Event parameter: `ref_id`
4. Save

### Creating a GTM Variable

1. In GTM, go to Variables → New
2. Variable Configuration: Data Layer Variable
3. Data Layer Variable Name: `ref_id`
4. Name it: `DLV - ref_id`
5. Save

Now you can use `{{DLV - ref_id}}` in any tag or trigger.

### Sample Report in GA4

Create an exploration report to analyze by ref_id:

1. Go to Explore → Blank
2. Dimensions: Add "Referral ID" (your custom dimension)
3. Metrics: Add "Active users", "Conversions", "Total revenue"
4. Rows: "Referral ID"
5. Values: All your metrics

This shows performance breakdown by referral source.

## Data Privacy Considerations

### GDPR Compliance

The ref_id is stored in localStorage, which is considered personal data under GDPR if it can identify individuals.

**Best Practices:**

1. **Clear ref_id on logout:**
   ```typescript
   import { clearRefId } from '@/lib/ref-id';

   function handleLogout() {
     clearRefId();
     // ... rest of logout logic
   }
   ```

2. **Respect cookie consent:**
   ```typescript
   import { initRefId, clearRefId } from '@/lib/ref-id';

   function handleCookieConsent(hasConsent: boolean) {
     if (hasConsent) {
       initRefId();
     } else {
       clearRefId();
     }
   }
   ```

3. **Data retention policy:**
   Consider clearing old ref_id values after a certain period:
   ```typescript
   // Example: Clear ref_id after 30 days
   const REF_ID_EXPIRY_KEY = 'gtm_ref_id_expiry';
   const EXPIRY_DAYS = 30;

   function checkRefIdExpiry() {
     const expiryDate = localStorage.getItem(REF_ID_EXPIRY_KEY);
     if (expiryDate && new Date() > new Date(expiryDate)) {
       clearRefId();
       localStorage.removeItem(REF_ID_EXPIRY_KEY);
     }
   }
   ```

## Troubleshooting

### ref_id Not Being Captured

**Check these common issues:**

1. **Typo in URL parameter:**
   - ✅ `?ref_id=123`
   - ❌ `?refid=123`
   - ❌ `?ref-id=123`

2. **localStorage Disabled:**
   - Some browsers/modes block localStorage
   - Check console for errors
   - Test in regular browser window (not incognito with strict settings)

3. **RefIdProvider Not Included:**
   - Verify `<RefIdProvider>` wraps children in [app/layout.tsx](app/layout.tsx)

### ref_id Shows as null

This is normal if:
- User visited without ref_id parameter
- localStorage was cleared
- First-time visitor with no referral link

### ref_id Not Updating

If URL has new ref_id but old one persists:
- Check browser console for JavaScript errors
- Verify `initRefId()` is being called
- Try clearing localStorage manually: `localStorage.removeItem('gtm_ref_id')`

### Testing in Development

```bash
# Start dev server
pnpm dev

# Visit with ref_id
open http://localhost:3000?ref_id=test123

# Check console output
# Should see: [RefID] Tracking initialized with ref_id: test123
```

## API Reference

### `initRefId(): string | null`

Initialize ref_id tracking. Call once on app load.

**Returns:** The active ref_id (from URL or localStorage) or null

### `getCurrentRefId(): string | null`

Get the current ref_id without initialization.

**Returns:** The stored ref_id or null

### `extractRefIdFromUrl(url?: string): string | null`

Extract ref_id from a URL.

**Parameters:**
- `url` (optional): URL to parse. Defaults to `window.location.href`

**Returns:** The ref_id parameter value or null

### `storeRefId(refId: string): void`

Store ref_id in localStorage.

**Parameters:**
- `refId`: The ref_id to store

### `getStoredRefId(): string | null`

Retrieve ref_id from localStorage.

**Returns:** The stored ref_id or null

### `clearRefId(): void`

Remove ref_id from localStorage.

## Migration Guide

If you have an existing GTM implementation and want to add ref_id tracking:

### Step 1: Add the Files

Copy these files to your project:
- `lib/ref-id.ts`
- `hooks/use-ref-id.ts`
- `components/ref-id-provider.tsx`

### Step 2: Update lib/gtm.ts

Add to the top:
```typescript
import { getCurrentRefId } from "./ref-id";
```

Update `pushEvent()`:
```typescript
export function pushEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== "undefined") {
    const refId = getCurrentRefId();
    window.dataLayer.push({
      event: eventName,
      ref_id: refId,
      ...eventParams,
    });
  }
}
```

### Step 3: Add Provider to Layout

```tsx
import { RefIdProvider } from "@/components/ref-id-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RefIdProvider>{children}</RefIdProvider>
      </body>
    </html>
  );
}
```

### Step 4: Test

1. Visit with `?ref_id=test`
2. Check console for initialization message
3. Verify events in GTM Preview mode include `ref_id`

---

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify localStorage is enabled
3. Test in GTM Preview mode
4. Review the troubleshooting section above

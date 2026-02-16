# Quick Test Guide: ref_id Tracking

## Verify ref_id is Working

### Step 1: Start the Dev Server
```bash
pnpm dev
```

### Step 2: Test with ref_id Parameter

Open your browser to:
```
http://localhost:3000?ref_id=test123
```

### Step 3: Check Browser Console

You should see:
```
[RefID] Tracking initialized with ref_id: test123
```

### Step 4: Inspect dataLayer

Open browser DevTools console and run:
```javascript
// See all events with ref_id
window.dataLayer
  .filter(e => e.event)
  .map(e => ({
    event: e.event,
    ref_id: e.ref_id
  }))
```

### Step 5: Test generate_click Event

1. Navigate to `/content-generator`
2. Click any "Generate" button
3. In console, run:
```javascript
// Find the generate_click event
window.dataLayer.find(e => e.event === 'generate_click')
```

**Expected output:**
```javascript
{
  event: "generate_click",
  ref_id: "test123",           // ✅ ref_id is here!
  button_name: "generate",
  category: "crypto",          // or ai, fintech, etc.
  cluster: "Story title..."
}
```

### Step 6: Test Persistence

1. Navigate to homepage (without ref_id in URL): `http://localhost:3000`
2. Console should still show: `[RefID] Tracking initialized with ref_id: test123`
3. Trigger any event (click button, submit form, etc.)
4. Check dataLayer - ref_id should still be `test123`

### Step 7: Test ref_id Override

1. Visit with new ref_id: `http://localhost:3000?ref_id=campaign456`
2. Console shows: `[RefID] Tracking initialized with ref_id: campaign456`
3. All new events will now have `ref_id: campaign456`

### Step 8: Test localStorage

In console:
```javascript
// Check localStorage directly
localStorage.getItem('gtm_ref_id')
// Output: "campaign456"

// Clear it
localStorage.removeItem('gtm_ref_id')

// Reload page
location.reload()
// Console: [RefID] No ref_id found in URL or localStorage
```

## Test All Event Types

### Button Click
```javascript
// Go to /tracking-demo, click any button
window.dataLayer.filter(e => e.event === 'button_click')
// Should include ref_id
```

### Form Submit
```javascript
// Go to /tracking-demo, submit form
window.dataLayer.filter(e => e.event === 'form_submit')
// Should include ref_id
```

### Ecommerce - Add to Cart
```javascript
// Go to /ecommerce, add product to cart
window.dataLayer.filter(e => e.event === 'add_to_cart')
// Should include ref_id in top level
```

### Page View
```javascript
// Navigate to any page
window.dataLayer.filter(e => e.event === 'page_view')
// Should include ref_id
```

### Scroll Depth
```javascript
// Go to /scroll-tracking, scroll down
window.dataLayer.filter(e => e.event === 'scroll_depth')
// Should include ref_id
```

## GTM Preview Mode Testing

1. In GTM, click **Preview**
2. Enter: `http://localhost:3000?ref_id=gtm_test`
3. Click **Connect**
4. In Tag Assistant, trigger various events
5. Click on any event in the Summary
6. Check **Data Layer** tab
7. Verify `ref_id: "gtm_test"` appears in every event

## GA4 DebugView Testing

1. Visit site with ref_id: `http://localhost:3000?ref_id=ga4_test`
2. Go to GA4 → Configure → DebugView
3. Trigger events (click buttons, add to cart, etc.)
4. Click on events in DebugView
5. Verify `ref_id` parameter shows in event details

## Success Criteria

✅ Console shows ref_id initialization message
✅ localStorage contains ref_id value
✅ All dataLayer events include ref_id
✅ ref_id persists across page navigation
✅ ref_id persists across browser sessions (reload)
✅ New ref_id from URL overwrites old value
✅ No ref_id in URL uses localStorage value
✅ GTM Preview shows ref_id in all events
✅ GA4 DebugView shows ref_id parameter
✅ Build passes without errors

## Troubleshooting

### ref_id is null in all events
- Check if localStorage is enabled in your browser
- Try incognito mode (without strict privacy settings)
- Check console for JavaScript errors

### ref_id not persisting across pages
- Verify RefIdProvider is in layout.tsx
- Check if localStorage.getItem('gtm_ref_id') returns value
- Look for console errors

### ref_id not updating with new URL parameter
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+F5)
- Clear localStorage manually: `localStorage.removeItem('gtm_ref_id')`
- Check browser console for errors

### Console shows "No ref_id found"
- This is normal if you haven't visited with ?ref_id parameter
- Visit: http://localhost:3000?ref_id=test123
- Should then see the initialization message

## Cleanup After Testing

```javascript
// Clear ref_id from localStorage
localStorage.removeItem('gtm_ref_id')

// Clear entire dataLayer
window.dataLayer.length = 0

// Reload page
location.reload()
```

# Documentation

This directory contains comprehensive documentation for the GTM tracking implementation.

## 📚 Main Guides

### [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md)
**Complete Google Tag Manager Setup Guide**

Step-by-step instructions for:
- Creating a GTM account and container
- Installing GTM in your Next.js project
- Configuring tags, triggers, and variables in GTM
- Setting up GA4 event tracking
- Testing with GTM Preview mode
- Publishing your container

**Start here** if you're new to GTM or setting up tracking for the first time.

---

### [REF-ID-TRACKING.md](./REF-ID-TRACKING.md)
**Referral ID Tracking - Complete Guide**

In-depth documentation for the ref_id tracking system:
- How ref_id tracking works (URL extraction + localStorage)
- Architecture and implementation details
- Use cases (affiliate marketing, campaigns, referrals)
- GTM configuration for ref_id
- Data privacy and GDPR considerations
- API reference for all ref_id functions
- Migration guide for existing implementations

**Read this** to understand how to use ref_id for attribution tracking.

---

### [TEST-REF-ID.md](./TEST-REF-ID.md)
**Quick Testing Guide for ref_id**

Practical testing instructions:
- Step-by-step testing procedures
- Browser console commands
- GTM Preview mode testing
- GA4 DebugView verification
- Success criteria checklist
- Troubleshooting common issues

**Use this** for quick verification that ref_id tracking is working correctly.

---

## 📖 Additional Resources

### [GTM-SETUP.md](./GTM-SETUP.md)
Original setup instructions (legacy)

### [gtm-clone-guide.md](./gtm-clone-guide.md)
Detailed guide for cloning GTM configurations

---

## 🚀 Quick Start

1. **Set up GTM**: Follow [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md)
2. **Test ref_id**: Use [TEST-REF-ID.md](./TEST-REF-ID.md)
3. **Learn more**: Read [REF-ID-TRACKING.md](./REF-ID-TRACKING.md)

## 📊 Features Documented

### Core Tracking
- ✅ Button clicks
- ✅ Form submissions
- ✅ External link clicks
- ✅ Custom page views
- ✅ JavaScript errors

### E-commerce Tracking
- ✅ Product impressions
- ✅ Product clicks
- ✅ Add to cart
- ✅ Remove from cart
- ✅ Checkout steps
- ✅ Purchase tracking

### Engagement Tracking
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Video engagement (play, pause, progress, complete)
- ✅ User engagement metrics

### Content Generator Tracking
- ✅ Generate button clicks
- ✅ Generation success/failure
- ✅ Output display
- ✅ Copy to clipboard

### Attribution Tracking
- ✅ Referral ID (ref_id) tracking
- ✅ URL parameter extraction
- ✅ localStorage persistence
- ✅ Cross-session attribution

## 🛠️ Implementation Files

The documentation references these key implementation files:

| File | Purpose |
|------|---------|
| `lib/gtm.ts` | Core GTM tracking functions |
| `lib/ref-id.ts` | Referral ID utilities |
| `hooks/use-ref-id.ts` | React hook for ref_id initialization |
| `components/ref-id-provider.tsx` | Provider component for ref_id |
| `app/layout.tsx` | GTM script injection and initialization |

## 📝 Event Reference

All events tracked by this implementation are documented in [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md#core-events).

Every event automatically includes:
- `ref_id` - Referral identifier (if available)
- Event-specific parameters
- Standard GA4 parameters

## 🧪 Testing

### Development Testing
```bash
# Start dev server
pnpm dev

# Visit with ref_id
open http://localhost:3000?ref_id=test123
```

### Console Testing
```javascript
// Check dataLayer
window.dataLayer

// Find specific events
window.dataLayer.filter(e => e.event === 'generate_click')

// Check ref_id in localStorage
localStorage.getItem('gtm_ref_id')
```

### GTM Preview Mode
See [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md#step-6-preview-and-test) for detailed instructions.

## 🔗 External Resources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Next.js Third-Party Scripts](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)

## 💡 Contributing

When adding new tracking features:

1. Update the tracking function in `lib/gtm.ts`
2. Document the event in [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md)
3. Add testing instructions to [TEST-REF-ID.md](./TEST-REF-ID.md)
4. Update this README if adding a new guide

## 📧 Support

For issues or questions:
- Check the troubleshooting sections in each guide
- Review browser console for errors
- Test in GTM Preview mode
- Verify in GA4 DebugView

# GTM Learning Project

A comprehensive Next.js 16 implementation demonstrating Google Tag Manager (GTM) integration patterns, including e-commerce tracking, scroll depth, video engagement, and referral attribution.

## 📚 Documentation

- **[GTM Setup Guide](./docs/GTM-SETUP-GUIDE.md)** - Complete step-by-step GTM configuration
- **[Referral Tracking Guide](./docs/REF-ID-TRACKING.md)** - ref_id attribution tracking system
- **[Testing Guide](./docs/TEST-REF-ID.md)** - Quick testing and verification guide
- **[All Documentation](./docs/)** - Browse all guides and resources

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your Google Tag Manager container ID.

## Demo Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with navigation and quick links |
| `/tracking-demo` | Form tracking, custom events, button clicks |
| `/ecommerce` | Full ecommerce funnel: products, cart, checkout, purchase |
| `/scroll-tracking` | Scroll depth tracking |
| `/video-tracking` | Video engagement tracking |
| `/user-engagement` | User engagement metrics |
| `/content-generator` | Content generation with tone selection and tracking |

## Events Tracked

### Core Events

**Note**: All events automatically include a `ref_id` parameter for attribution tracking when users arrive via referral links (e.g., `?ref_id=campaign123`).

| Event | Description | Parameters |
|-------|-------------|------------|
| `button_click` | Button interactions | `ref_id`, `button_name`, `button_text`, `button_location` |
| `external_link_click` | External link clicks | `ref_id`, `link_url`, `link_text`, `link_domain` |
| `form_submit` | Form submissions | `ref_id`, `form_name`, `form_id` |
| `page_view` | Page views | `ref_id`, `page_path`, `page_title` |
| `generate_click` | Generate button clicks | `ref_id`, `button_name`, `category`, `cluster` |

### Ecommerce Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `view_item_list` | Product listing viewed | `ecommerce.items[]` |
| `select_item` | Product clicked | `ecommerce.items[]` |
| `add_to_cart` | Product added to cart | `ecommerce.value`, `ecommerce.currency`, `ecommerce.items[]` |
| `remove_from_cart` | Product removed from cart | `ecommerce.value`, `ecommerce.currency`, `ecommerce.items[]` |
| `begin_checkout` | Checkout started | `ecommerce.checkout_step`, `ecommerce.checkout_option`, `ecommerce.items[]` |
| `purchase` | Purchase completed | `ecommerce.transaction_id`, `ecommerce.value`, `ecommerce.tax`, `ecommerce.shipping`, `ecommerce.currency`, `ecommerce.items[]` |

### Engagement Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `scroll_depth` | Scroll milestones | `scroll_depth`, `scroll_depth_unit`, `page_path` |
| `video_engagement` | Video interactions | `video_id`, `video_title`, `video_status`, `video_progress` |
| `user_engagement` | User engagement | `engagement_time_seconds`, `engagement_score` |

### Error Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `js_error` | JavaScript errors | `error_message`, `error_stack` |

## Features

✨ **Comprehensive Tracking**
- Button clicks, form submissions, external links
- E-commerce funnel (view → add to cart → checkout → purchase)
- Scroll depth tracking (25%, 50%, 75%, 100%)
- Video engagement (play, pause, progress, complete)
- User engagement metrics
- Content generation tracking
- JavaScript error tracking

🎯 **Attribution Tracking**
- Automatic `ref_id` extraction from URL parameters
- localStorage persistence across sessions
- All events include referral attribution

🛠️ **TypeScript-Safe**
- Full type definitions for all tracking functions
- Type-safe event parameters
- Autocomplete support in IDEs

## Additional Resources

See the **[docs](./docs/)** folder for complete documentation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

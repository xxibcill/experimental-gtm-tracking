This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Events Tracked

### Core Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `button_click` | Button interactions | `button_name`, `button_text`, `button_location` |
| `external_link_click` | External link clicks | `link_url`, `link_text`, `link_domain` |
| `form_submit` | Form submissions | `form_name`, `form_id` |
| `page_view` | Page views | `page_path`, `page_title` |

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

## GTM Setup Guide

For detailed instructions on setting up Google Tag Manager, see [GTM-SETUP-GUIDE.md](./GTM-SETUP-GUIDE.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

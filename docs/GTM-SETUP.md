# Google Tag Manager Setup Guide

This guide walks you through setting up Google Tag Manager to work with this Next.js tracking project.

## Prerequisites

- A Google Account (for GTM access)
- Your GTM Container ID (format: `GTM-XXXXXXX`)

---

## Step 1: Create a GTM Account

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Sign in with your Google Account
3. Click **"Create Account"**
4. Fill in your account details:
   - Account Name: Your company or project name
   - Country: Your country
5. Click **Continue**

## Step 2: Create a Container

1. Set up your first container:
   - Container Name: `Your Project Name`
   - Target Platform: **Web**
2. Click **Create**
3. Accept the Terms of Service

## Step 3: Get Your Container ID

1. After creating the container, you'll see the GTM installation code
2. Your Container ID is the `GTM-XXXXXXX` shown in the script tags
3. Copy this ID for use in Step 4

## Step 4: Configure Environment Variable

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual Container ID from Step 3.

Restart your dev server:

```bash
pnpm dev
```

---

## Step 5: Configure Tags in GTM

### 5.1 Create Google Analytics 4 Tag (Optional)

If you're using Google Analytics 4:

1. **Tags** → **New**
2. Tag Configuration → **Google Analytics: GA4 Event**
3. For the first tag, select **Create New** → **Google Analytics 4 Configuration**
4. Enter your Measurement ID (starts with `G-`)
5. Click **Triggering** → select **All Pages** (or create a trigger)
6. Name: `GA4 - All Pages`
7. Save

### 5.2 Create Event Tags

Create tags for your tracked events:

| Event Name | Trigger Type | Configuration |
|------------|--------------|---------------|
| button_click | Custom Event | Event name: `button_click` |
| external_link_click | Custom Event | Event name: `external_link_click` |
| form_submit | Custom Event | Event name: `form_submit` |
| scroll_depth | Custom Event | Event name: `scroll_depth` |
| video_engagement | Custom Event | Event name: `video_engagement` |
| add_to_cart | Custom Event | Event name: `add_to_cart` |
| purchase | Custom Event | Event name |

###: `purchase` 5.3 Enhanced Ecommerce Events

For ecommerce tracking, create these tags:

1. **Tag Configuration** → **Google Analytics: GA4 Event**
2. Event Name: `view_item_list`
3. More settings → **Ecommerce** → Check "Send Ecommerce data"
4. Trigger: Custom Event `view_item_list`

Repeat for:
- `select_item`
- `add_to_cart`
- `remove_from_cart`
- `begin_checkout`
- `purchase`

---

## Step 6: Create Variables (Optional)

Create Data Layer Variables to capture additional parameters:

1. **Variables** → **New**
2. Variable Configuration → **Data Layer Variable**
3. Set Data Layer Variable Name to any parameter, for example:
   - `button_name`
   - `button_text`
   - `product_id`
   - `transaction_id`
   - `scroll_depth`

---

## Step 7: Test with Preview Mode

1. In GTM, click **Preview** (blue button in top right)
2. Enter your site URL: `http://localhost:3000`
3. Click **Connect**

4. Your site will open with a GTM Preview banner

5. Interact with your site:
   - Click buttons
   - Add products to cart
   - Submit forms
   - Scroll down

6. Check the **GTM Debug Panel** to see events firing

7. Verify:
   - Tags are firing on correct events
   - Data layer contains expected parameters
   - No errors in console

---

## Step 8: Publish

Once testing is complete:

1. In GTM, click **Submit**
2. Enter version name: `Initial Setup` or `v1.0`
3. Add description (optional)
4. Click **Publish**

Your GTM container is now live!

---

## Quick Reference: Event Mapping

| dataLayer Event | GTM Trigger | GA4 Event Name |
|-----------------|-------------|----------------|
| `button_click` | Custom Event: `button_click` | button_click |
| `external_link_click` | Custom Event: `external_link_click` | external_link_click |
| `form_submit` | Custom Event: `form_submit` | form_submit |
| `scroll_depth` | Custom Event: `scroll_depth` | scroll_depth |
| `video_engagement` | Custom Event: `video_engagement` | video_engagement |
| `view_item_list` | Custom Event: `view_item_list` | view_item_list |
| `select_item` | Custom Event: `select_item` | select_item |
| `add_to_cart` | Custom Event: `add_to_cart` | add_to_cart |
| `remove_from_cart` | Custom Event: `remove_from_cart` | remove_from_cart |
| `begin_checkout` | Custom Event: `begin_checkout` | begin_checkout |
| `purchase` | Custom Event: `purchase` | purchase |
| `js_error` | Custom Event: `js_error` | js_error |

---

## Troubleshooting

### Events not firing
- Check browser console for errors
- Verify Preview mode is connected
- Ensure Trigger conditions match your events

### Missing parameters
- Verify Data Layer Variables are configured
- Check that parameters are being pushed to dataLayer

### GTM not loading
- Confirm `NEXT_PUBLIC_GTM_ID` is set correctly
- Verify GTM script appears in page source
- Check container ID matches exactly

### Container ID not working
- Ensure no extra spaces in the ID
- Verify container is published (not in draft)

/**
 * Google Tag Manager Utility Functions
 *
 * This module provides TypeScript-safe utilities for interacting with GTM.
 * All functions safely interact with the window.dataLayer array.
 */

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// GTM Container ID - Replace with your actual GTM container ID
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

/**
 * Initialize the dataLayer array if it doesn't exist
 */
export function initDataLayer(): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
  }
}

/**
 * Push an event to the dataLayer
 * @param eventName - The name of the event
 * @param eventParams - Optional parameters for the event
 */
export function pushEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
}

/**
 * Track a custom event
 * @param eventName - The name of the event
 * @param parameters - Event parameters
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  pushEvent(eventName, parameters);
}

/**
 * Track a button click
 * @param buttonName - Identifier for the button
 * @param buttonText - Text content of the button
 * @param buttonLocation - Location of the button on the page
 */
export function trackButtonClick(
  buttonName: string,
  buttonText?: string,
  buttonLocation?: string
): void {
  pushEvent("button_click", {
    button_name: buttonName,
    button_text: buttonText,
    button_location: buttonLocation,
  });
}

/**
 * Track an external link click
 * @param url - The URL of the external link
 * @param linkText - Text content of the link
 */
export function trackExternalLink(url: string, linkText?: string): void {
  pushEvent("external_link_click", {
    link_url: url,
    link_text: linkText,
    link_domain: extractDomain(url),
  });
}

/**
 * Track a form submission
 * @param formName - Identifier for the form
 * @param formId - ID of the form element
 */
export function trackFormSubmit(formName: string, formId?: string): void {
  pushEvent("form_submit", {
    form_name: formName,
    form_id: formId,
  });
}

/**
 * Track page view with custom parameters
 * @param pagePath - The path of the page
 * @param pageTitle - The title of the page
 * @param customParams - Additional custom parameters
 */
export function trackPageView(
  pagePath: string,
  pageTitle: string,
  customParams?: Record<string, unknown>
): void {
  pushEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    ...customParams,
  });
}

/**
 * Track scroll depth
 * @param depth - The scroll depth percentage (25, 50, 75, 100)
 * @param pagePath - The current page path
 */
export function trackScrollDepth(depth: number, pagePath: string): void {
  pushEvent("scroll_depth", {
    scroll_depth: depth,
    scroll_depth_unit: "percent",
    page_path: pagePath,
  });
}

/**
 * Track video engagement
 * @param videoId - Identifier for the video
 * @param videoTitle - Title of the video
 * @param status - Video status (play, pause, complete, progress)
 * @param progress - Progress percentage for progress events
 */
export function trackVideoEvent(
  videoId: string,
  videoTitle: string,
  status: "play" | "pause" | "complete" | "progress" | "seek",
  progress?: number
): void {
  pushEvent("video_engagement", {
    video_id: videoId,
    video_title: videoTitle,
    video_status: status,
    video_progress: progress,
  });
}

/**
 * Track enhanced ecommerce events
 */
export const ecommerce = {
  /**
   * Track product impression
   */
  trackProductImpression: (
    products: Array<{
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      list?: string;
      position?: number;
    }>
  ): void => {
    pushEvent("view_item_list", {
      ecommerce: {
        items: products.map((product, index) => ({
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          item_variant: product.variant,
          price: product.price,
          item_list_name: product.list,
          index: product.position ?? index,
        })),
      },
    });
  },

  /**
   * Track product click
   */
  trackProductClick: (
    product: {
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      list?: string;
    },
    position?: number
  ): void => {
    pushEvent("select_item", {
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: product.variant,
            price: product.price,
            item_list_name: product.list,
            index: position,
          },
        ],
      },
    });
  },

  /**
   * Track add to cart
   */
  trackAddToCart: (
    product: {
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      quantity?: number;
    },
    value?: number,
    currency?: string
  ): void => {
    pushEvent("add_to_cart", {
      ecommerce: {
        value: value ?? product.price,
        currency: currency ?? "USD",
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: product.variant,
            price: product.price,
            quantity: product.quantity ?? 1,
          },
        ],
      },
    });
  },

  /**
   * Track remove from cart
   */
  trackRemoveFromCart: (
    product: {
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      quantity?: number;
    },
    value?: number,
    currency?: string
  ): void => {
    pushEvent("remove_from_cart", {
      ecommerce: {
        value: value ?? product.price,
        currency: currency ?? "USD",
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: product.variant,
            price: product.price,
            quantity: product.quantity ?? 1,
          },
        ],
      },
    });
  },

  /**
   * Track checkout step
   */
  trackCheckoutStep: (
    step: number,
    stepName: string,
    products: Array<{
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      quantity?: number;
    }>,
    option?: string
  ): void => {
    pushEvent("begin_checkout", {
      ecommerce: {
        checkout_step: step,
        checkout_option: option,
        items: products.map((product) => ({
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          item_variant: product.variant,
          price: product.price,
          quantity: product.quantity ?? 1,
        })),
      },
    });
  },

  /**
   * Track purchase
   */
  trackPurchase: (
    transactionId: string,
    products: Array<{
      id: string;
      name: string;
      brand?: string;
      category?: string;
      variant?: string;
      price?: number;
      quantity?: number;
    }>,
    revenue: number,
    tax?: number,
    shipping?: number,
    currency?: string
  ): void => {
    pushEvent("purchase", {
      ecommerce: {
        transaction_id: transactionId,
        value: revenue,
        tax: tax,
        shipping: shipping,
        currency: currency ?? "USD",
        items: products.map((product) => ({
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          item_variant: product.variant,
          price: product.price,
          quantity: product.quantity ?? 1,
        })),
      },
    });
  },
};

/**
 * Set user properties
 * @param userId - Unique user identifier
 * @param userProperties - Additional user properties
 */
export function setUserProperties(
  userId: string,
  userProperties?: Record<string, unknown>
): void {
  pushEvent("set_user_properties", {
    user_id: userId,
    ...userProperties,
  });
}

/**
 * Track user engagement
 * @param engagementTime - Time spent on page in seconds
 * @param engagementScore - Calculated engagement score
 */
export function trackUserEngagement(
  engagementTime: number,
  engagementScore?: number
): void {
  pushEvent("user_engagement", {
    engagement_time_seconds: engagementTime,
    engagement_score: engagementScore,
  });
}

/**
 * Track JavaScript errors
 * @param errorMessage - The error message
 * @param errorStack - The error stack trace
 */
export function trackError(errorMessage: string, errorStack?: string): void {
  pushEvent("js_error", {
    error_message: errorMessage,
    error_stack: errorStack,
  });
}

/**
 * Helper function to extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return "";
  }
}

/**
 * Initialize error tracking
 * Call this once in the app to set up global error handling
 */
export function initErrorTracking(): void {
  if (typeof window !== "undefined") {
    window.onerror = (message, source, lineno, colno, error) => {
      trackError(
        String(message),
        error?.stack
      );
      return false;
    };

    window.onunhandledrejection = (event) => {
      trackError(
        `Unhandled Promise Rejection: ${event.reason}`,
        event.reason?.stack
      );
    };
  }
}

/**
 * Track generate button click
 * @param category - The content category
 * @param cluster - The content cluster/topic
 */
export function trackGenerateClick(category: string, cluster: string): void {
  pushEvent("generate_click", {
    button_name: "generate",
    category,
    cluster,
  });
}

/**
 * Track successful content generation
 * @param generationTimeMs - Time taken to generate in milliseconds
 */
export function trackGenerateSuccess(generationTimeMs: number): void {
  pushEvent("generate_success", {
    generation_time_ms: generationTimeMs,
  });
}

/**
 * Track failed content generation
 * @param errorType - Type of error that occurred
 */
export function trackGenerateFailed(errorType: string): void {
  pushEvent("generate_failed", {
    error_type: errorType,
  });
}

/**
 * Track when output is generated
 * @param category - The content category
 * @param cluster - The content cluster/topic
 */
export function trackOutputGenerated(category: string, cluster: string): void {
  pushEvent("output_generated", {
    category,
    cluster,
  });
}

/**
 * Track copy to clipboard action
 * @param category - The content category
 * @param cluster - The content cluster/topic
 */
export function trackCopyToClipboard(category: string, cluster: string): void {
  pushEvent("copy_to_clipboard", {
    category,
    cluster,
  });
}

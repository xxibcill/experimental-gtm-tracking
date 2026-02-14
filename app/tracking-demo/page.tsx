"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trackButtonClick, trackEvent, trackFormSubmit } from "@/lib/gtm";

export default function TrackingDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Track input focus/blur for form engagement
    trackEvent("form_input_interaction", {
      form_name: "contact_form",
      input_name: name,
      interaction_type: "change",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit("contact_form", "contact-form");
    setFormSubmitted(true);
    trackEvent("form_complete", {
      form_name: "contact_form",
      form_fields: Object.keys(formData).length,
    });
  };

  const handleCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
    trackEvent(eventName, params);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={40}
              height={16}
              priority
            />
          </Link>
          <span className="font-semibold text-lg">GTM Learning</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Home
          </Link>
          <Link href="/tracking-demo" className="text-sm font-medium hover:text-gray-600">
            Tracking Demo
          </Link>
          <Link href="/ecommerce" className="text-sm font-medium hover:text-gray-600">
            Ecommerce
          </Link>
          <Link href="/scroll-tracking" className="text-sm font-medium hover:text-gray-600">
            Scroll Tracking
          </Link>
          <Link href="/video-tracking" className="text-sm font-medium hover:text-gray-600">
            Video Tracking
          </Link>
          <Link href="/user-engagement" className="text-sm font-medium hover:text-gray-600">
            User Engagement
          </Link>
        </div>
      </nav>

      <main className="flex-1 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Tracking Demo</h1>
          <p className="text-lg text-gray-600 mb-12">
            This page demonstrates form tracking and custom event triggers.
          </p>

          {/* Custom Event Triggers */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Custom Event Triggers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() =>
                  handleCustomEvent("demo_button_click", {
                    button_id: "demo_1",
                    button_category: "custom_event",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                data-gtm-category="custom_event"
                data-gtm-action="click"
                data-gtm-label="demo_button_1"
              >
                Custom Event 1
              </button>
              <button
                onClick={() =>
                  handleCustomEvent("demo_button_click", {
                    button_id: "demo_2",
                    button_category: "custom_event",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                data-gtm-category="custom_event"
                data-gtm-action="click"
                data-gtm-label="demo_button_2"
              >
                Custom Event 2
              </button>
              <button
                onClick={() =>
                  handleCustomEvent("demo_button_click", {
                    button_id: "demo_3",
                    button_category: "custom_event",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                data-gtm-category="custom_event"
                data-gtm-action="click"
                data-gtm-label="demo_button_3"
              >
                Custom Event 3
              </button>
              <button
                onClick={() =>
                  trackEvent("promo_banner_click", {
                    banner_id: "summer_sale",
                    banner_position: "mid_page",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                data-gtm-category="promotion"
                data-gtm-action="click"
                data-gtm-label="summer_sale_banner"
              >
                Summer Sale Banner
              </button>
              <button
                onClick={() =>
                  trackEvent("newsletter_signup_click", {
                    signup_location: "inline",
                    signup_cta: "subscribe_now",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                data-gtm-category="newsletter"
                data-gtm-action="click"
                data-gtm-label="subscribe_cta"
              >
                Newsletter Signup
              </button>
              <button
                onClick={() =>
                  trackEvent("support_click", {
                    support_type: "chat",
                    support_location: "demo_page",
                  })
                }
                className="p-4 border border-gray-300 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                data-gtm-category="support"
                data-gtm-action="click"
                data-gtm-label="live_chat"
              >
                Live Chat
              </button>
            </div>
          </section>

          {/* Interactive Elements */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Interactive Elements</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  trackButtonClick("toggle_advanced_options", "Show Advanced Options", "demo_page")
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                data-gtm-category="ui_interaction"
                data-gtm-action="click"
                data-gtm-label="toggle_advanced"
              >
                Toggle Advanced Options
              </button>
              <button
                onClick={() =>
                  trackButtonClick("download_resource", "Download PDF", "demo_page")
                }
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                data-gtm-category="download"
                data-gtm-action="click"
                data-gtm-label="download_pdf"
              >
                Download PDF
              </button>
              <button
                onClick={() =>
                  trackEvent("share_content", {
                    share_platform: "twitter",
                    content_type: "article",
                    content_id: "gtm-demo-001",
                  })
                }
                className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                data-gtm-category="social_share"
                data-gtm-action="click"
                data-gtm-label="share_twitter"
              >
                Share on Twitter
              </button>
              <button
                onClick={() =>
                  trackEvent("share_content", {
                    share_platform: "linkedin",
                    content_type: "article",
                    content_id: "gtm-demo-001",
                  })
                }
                className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                data-gtm-category="social_share"
                data-gtm-action="click"
                data-gtm-label="share_linkedin"
              >
                Share on LinkedIn
              </button>
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
            <p className="text-gray-600 mb-6">
              Fill out this form to see form submission tracking in action. Open your
              browser console to see the dataLayer events.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Thank you!
                </h3>
                <p className="text-green-700">
                  Your form has been submitted. Check the console for the tracking
                  event.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-green-700 underline"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleFormSubmit}
                className="space-y-6 max-w-xl"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-gtm-field="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-gtm-field="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    data-gtm-field="message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  data-gtm-category="form"
                  data-gtm-action="submit"
                  data-gtm-label="contact_form_submit"
                >
                  Submit Form
                </button>
              </form>
            )}
          </section>

          {/* Newsletter Signup */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Newsletter Signup</h2>
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form
                id="newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  trackFormSubmit("newsletter_form", "newsletter-form");
                  trackEvent("newsletter_signup", {
                    signup_source: "demo_page",
                    signup_cta: "inline_form",
                  });
                  alert("Newsletter subscribed! Check console for tracking event.");
                }}
                className="flex gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-gtm-field="newsletter_email"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  data-gtm-category="newsletter"
                  data-gtm-action="submit"
                  data-gtm-label="newsletter_form"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

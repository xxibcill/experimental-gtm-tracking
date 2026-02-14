"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ecommerce, trackEvent } from "@/lib/gtm";

// Sample product data
const products = [
  {
    id: "PROD-001",
    name: "Premium Wireless Headphones",
    brand: "AudioTech",
    category: "Electronics",
    price: 299.99,
    image: "https://via.placeholder.com/200x200?text=Headphones",
  },
  {
    id: "PROD-002",
    name: "Smart Watch Pro",
    brand: "TechWear",
    category: "Electronics",
    price: 449.99,
    image: "https://via.placeholder.com/200x200?text=Smart+Watch",
  },
  {
    id: "PROD-003",
    name: "Portable Bluetooth Speaker",
    brand: "SoundBox",
    category: "Electronics",
    price: 129.99,
    image: "https://via.placeholder.com/200x200?text=Speaker",
  },
  {
    id: "PROD-004",
    name: "Noise Canceling Earbuds",
    brand: "AudioTech",
    category: "Electronics",
    price: 199.99,
    image: "https://via.placeholder.com/200x200?text=Earbuds",
  },
  {
    id: "PROD-005",
    name: "Fitness Tracker Band",
    brand: "TechWear",
    category: "Electronics",
    price: 89.99,
    image: "https://via.placeholder.com/200x200?text=Fitness+Tracker",
  },
  {
    id: "PROD-006",
    name: "Wireless Charging Pad",
    brand: "PowerUp",
    category: "Accessories",
    price: 39.99,
    image: "https://via.placeholder.com/200x200?text=Charger",
  },
];

interface CartItem {
  product: (typeof products)[0];
  quantity: number;
}

export default function Ecommerce() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  // Track product impressions on mount
  useEffect(() => {
    ecommerce.trackProductImpression(
      products.map((product, index) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        list: "product_listing",
        position: index + 1,
      }))
    );
  });

  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }

    ecommerce.trackAddToCart(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
      },
      product.price,
      "USD"
    );

    trackEvent("add_to_cart_ui", {
      product_id: product.id,
      product_name: product.name,
      cart_count: cart.length + 1,
    });
  };

  const removeFromCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.product.id !== product.id));
    }

    ecommerce.trackRemoveFromCart(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
      },
      product.price,
      "USD"
    );
  };

  const handleProductClick = (product: (typeof products)[0], position: number) => {
    ecommerce.trackProductClick(
      {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        list: "product_listing",
      },
      position
    );

    trackEvent("product_click", {
      product_id: product.id,
      product_name: product.name,
      product_position: position,
    });
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep(1);

    ecommerce.trackCheckoutStep(
      1,
      "Checkout Started",
      cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
      "guest_checkout"
    );
  };

  const handlePurchase = () => {
    const transactionId = `TXN-${Date.now()}`;
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    ecommerce.trackPurchase(
      transactionId,
      cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total,
      total * 0.08, // Tax
      9.99, // Shipping
      "USD"
    );

    trackEvent("purchase_complete", {
      transaction_id: transactionId,
      transaction_total: total,
      item_count: cart.reduce((sum, item) => sum + item.quantity, 0),
    });

    setCart([]);
    setShowCheckout(false);
    setCheckoutStep(0);
    alert("Purchase complete! Check console for tracking event.");
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Ecommerce Tracking</h1>
          <p className="text-lg text-gray-600 mb-12">
            This page demonstrates enhanced ecommerce tracking. Open your browser console
            to see the dataLayer events.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Listing */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    data-gtm-product-id={product.id}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-400">{product.name}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                    <p className="text-lg font-bold mb-3">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => {
                        handleProductClick(product, index + 1);
                        addToCart(product);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      data-gtm-category="ecommerce"
                      data-gtm-action="add_to_cart"
                      data-gtm-label={product.id}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-center border-b border-gray-200 pb-4"
                          >
                            <div>
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.product)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={handleCheckout}
                        className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        data-gtm-category="ecommerce"
                        data-gtm-action="begin_checkout"
                        data-gtm-label="cart"
                      >
                        Proceed to Checkout
                      </button>
                    </>
                  )}
                </div>

                {/* Tracking Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Tracked Events:</h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>- view_item_list (product impressions)</li>
                    <li>- select_item (product click)</li>
                    <li>- add_to_cart</li>
                    <li>- remove_from_cart</li>
                    <li>- begin_checkout</li>
                    <li>- purchase</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Modal */}
          {showCheckout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                {/* Checkout Steps */}
                <div className="flex justify-between mb-6">
                  <div
                    className={`flex-1 text-center ${
                      checkoutStep >= 1 ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <span className="block text-sm font-medium">Step 1</span>
                    <span className="text-xs">Cart Review</span>
                  </div>
                  <div
                    className={`flex-1 text-center ${
                      checkoutStep >= 2 ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <span className="block text-sm font-medium">Step 2</span>
                    <span className="text-xs">Shipping</span>
                  </div>
                  <div
                    className={`flex-1 text-center ${
                      checkoutStep >= 3 ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    <span className="block text-sm font-medium">Step 3</span>
                    <span className="text-xs">Payment</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm py-2"
                    >
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    data-gtm-category="ecommerce"
                    data-gtm-action="purchase"
                    data-gtm-label="checkout_complete"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

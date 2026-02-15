import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GTM_ID } from "@/lib/gtm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTM Learning Project",
  description: "A comprehensive Google Tag Manager implementation showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GTM Script - Load with afterInteractive strategy */}
        {GTM_ID && GTM_ID !== "GTM-XXXXXXX" && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
        {/* Initialize dataLayer and error tracking */}
        <Script
          id="gtm-datalayer-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function() { window.dataLayer.push(arguments); };
              gtag('js', new Date());
              ${GTM_ID && GTM_ID !== "GTM-XXXXXXX" ? `gtm('config', '${GTM_ID}');` : ""}

              // Global error tracking
              window.onerror = function(message, source, lineno, colno, error) {
                // Ignore browser extension errors
                if (source && source.includes('chrome-extension://')) {
                  return false;
                }
                // Ignore ethereum property redefinition errors from crypto wallets
                if (message && String(message).includes('Cannot redefine property: ethereum')) {
                  return false;
                }

                window.dataLayer.push({
                  event: 'js_error',
                  error_message: String(message),
                  error_stack: error ? error.stack : '',
                  error_lineno: lineno,
                  error_colno: colno,
                  error_source: source
                });
                return false;
              };

              window.onunhandledrejection = function(event) {
                window.dataLayer.push({
                  event: 'js_error',
                  error_message: 'Unhandled Promise Rejection: ' + String(event.reason),
                  error_stack: event.reason && event.reason.stack ? event.reason.stack : ''
                });
              };
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM Noscript Fallback */}
        {GTM_ID && GTM_ID !== "GTM-XXXXXXX" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}

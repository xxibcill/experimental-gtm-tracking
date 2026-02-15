'use client'

import Image from 'next/image'
import Link from 'next/link'
import { trackButtonClick, trackExternalLink } from '@/lib/gtm'

export default function Home() {
  const handleCtaClick = () => {
    trackButtonClick('deploy_now_cta', 'Deploy Now', 'home_hero')
  }

  const handleDocsClick = () => {
    trackButtonClick('documentation_cta', 'Documentation', 'home_hero')
  }

  const handleExternalLinkClick = (url: string, text: string) => {
    trackExternalLink(url, text)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={40}
            height={16}
            priority
          />
          <span className="font-semibold text-lg">GTM Learning</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="home"
          >
            Home
          </Link>
          <Link
            href="/content-generator"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="content-generator"
          >
            Content Generator
          </Link>
          <Link
            href="/tracking-demo"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="tracking-demo"
          >
            Tracking Demo
          </Link>
          <Link
            href="/ecommerce"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="ecommerce"
          >
            Ecommerce
          </Link>
          <Link
            href="/scroll-tracking"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="scroll-tracking"
          >
            Scroll Tracking
          </Link>
          <Link
            href="/video-tracking"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="video-tracking"
          >
            Video Tracking
          </Link>
          <Link
            href="/user-engagement"
            className="text-base font-medium hover:text-gray-400 transition-colors"
            data-gtm-nav="user-engagement"
          >
            User Engagement
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              GTM Learning Project
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              This is a comprehensive demo of Google Tag Manager implementation. Explore the pages
              to see different tracking patterns in action.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-black transition-colors hover:bg-gray-100 md:w-[158px] cursor-pointer"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-category="external_link"
              data-gtm-action="click"
              data-gtm-label="deploy_now"
              onClick={() =>
                handleExternalLinkClick(
                  'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app',
                  'Deploy Now',
                )
              }
            >
              <Image src="/vercel.svg" alt="Vercel logomark" width={16} height={16} />
              Deploy Now
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border-2 border-solid border-white/30 px-5 transition-colors hover:border-white/50 hover:bg-white/10 md:w-[158px] cursor-pointer text-white"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-category="external_link"
              data-gtm-action="click"
              data-gtm-label="documentation"
              onClick={() =>
                handleExternalLinkClick(
                  'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app',
                  'Documentation',
                )
              }
            >
              Documentation
            </a>
          </div>
        </main>
      </div>

      {/* Demo Section with Internal Buttons */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/content-generator"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="content_generator"
            >
              Content Generator
            </Link>
            <Link
              href="/tracking-demo"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="tracking_demo"
            >
              Tracking Demo
            </Link>
            <Link
              href="/ecommerce"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="ecommerce"
            >
              Ecommerce
            </Link>
            <Link
              href="/scroll-tracking"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="scroll_tracking"
            >
              Scroll Tracking
            </Link>
            <Link
              href="/video-tracking"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="video_tracking"
            >
              Video Tracking
            </Link>
            <Link
              href="/user-engagement"
              className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-4 transition-colors hover:bg-gray-100"
              data-gtm-category="navigation"
              data-gtm-action="click"
              data-gtm-label="user_engagement"
            >
              User Engagement
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

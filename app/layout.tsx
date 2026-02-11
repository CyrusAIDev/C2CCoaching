import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'From Campus 2 Corporate | Land Your Dream Internship & New Grad Role',
  description: '1:1 coaching for students and early-career professionals. Land internships and new grad roles at top companies like IBM, Deloitte, Amazon, and more.',
  keywords: ['career coaching', 'internship', 'new grad', 'recruiting', 'student jobs', 'career development'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        {/* MailerLite Universal */}
        <Script id="mailerlite-universal" strategy="afterInteractive">
          {`
(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
ml('account', '1640091');
          `}
        </Script>
      </body>
    </html>
  )
}

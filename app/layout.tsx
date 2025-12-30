import type React from "react"
import type { Metadata } from "next"
import { Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lora = Lora({
  weight: ["400", "600", "700"], // Only 3 weights: regular, semibold, bold
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Optimal for performance
})

export const metadata: Metadata = {
  title: "Alby Diamond Co. - Exquisite Diamond & Jewelry Collection",
  description:
    "Discover timeless elegance with Alby Diamond Co. Explore our curated collection of fine diamonds and luxury jewelry, crafted with exceptional artistry.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

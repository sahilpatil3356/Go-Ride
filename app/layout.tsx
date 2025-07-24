import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🐉 Circle X: The Beast Socialverse',
  description: '🔥 Built for vibes. Made for legends. Next-gen social media super app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}

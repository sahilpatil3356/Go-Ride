import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Circle X',
  description: 'Your innovative platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

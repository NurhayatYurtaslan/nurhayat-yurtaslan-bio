import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nurhayat Yurtaslan - Mobile Developer',
  description: 'Personal portfolio and bio website of Nurhayat Yurtaslan, a passionate mobile developer specializing in Flutter and cross-platform app development.',
  keywords: ['mobile developer', 'flutter developer', 'dart', 'cross-platform', 'portfolio'],
  authors: [{ name: 'Nurhayat Yurtaslan' }],
  metadataBase: new URL('http://localhost:3002'),
  openGraph: {
    title: 'Nurhayat Yurtaslan - Mobile Developer',
    description: 'Personal portfolio and bio website of Nurhayat Yurtaslan',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="cyber-grid min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 
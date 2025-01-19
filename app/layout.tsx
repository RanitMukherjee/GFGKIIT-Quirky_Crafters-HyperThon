import './globals.css'
import { Inter } from 'next/font/google'
import { FloatingDock } from '@/components/FloatingDock'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hackathon Helper',
  description: 'Your ultimate companion for hackathons',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-teal-100`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 text-teal-400">
            <div className="container mx-auto px-4 py-4 text-center">
              © 2025 Hackathon Helper. All rights reserved.
            </div>
          </footer>
          <FloatingDock />
        </div>
      </body>
    </html>
  )
}


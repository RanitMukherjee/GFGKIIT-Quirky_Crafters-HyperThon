'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Lightbulb, MessageSquare, Bot, FileText } from 'lucide-react'

const dockItems = [
  { href: '/', icon: Rocket, label: 'Home' },
  { href: '/ideas', icon: Lightbulb, label: 'Ideas' },
  { href: '/feedback', icon: MessageSquare, label: 'Feedback' },
  { href: '/chat', icon: Bot, label: 'Chat' },
  { href: '/resume', icon: FileText, label: 'Resume' },
]

export function FloatingDock() {
  return (
    <motion.div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-full p-2 shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="flex space-x-4">
        {dockItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <motion.div
              className="p-2 rounded-full bg-gray-700 text-teal-300 hover:bg-teal-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon size={24} />
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}


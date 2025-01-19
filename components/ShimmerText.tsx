'use client'

import { motion } from 'framer-motion'

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
    >
      {children}
      <motion.span
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #00000000, #ffffff80, #00000000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}


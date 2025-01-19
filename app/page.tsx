'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, Lightbulb, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import YouTube from 'react-youtube'
import { ShimmerText } from '@/components/ShimmerText'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight">
          <ShimmerText className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Welcome to Hackathon Helper
          </ShimmerText>
        </h1>
        <p className="text-xl text-teal-300 max-w-2xl mx-auto">
          Your ultimate companion for hackathons. Generate ideas, get feedback, and supercharge your projects!
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/ideas" className="flex items-center">
              <Lightbulb className="mr-2" />
              Generate Ideas
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-teal-300 border-teal-300 hover:bg-teal-800">
            <Link href="/feedback" className="flex items-center">
              <MessageSquare className="mr-2" />
              Get Feedback
            </Link>
          </Button>
        </div>
      </motion.div>
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative mx-auto" style={{ width: '640px', height: '390px' }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg"
            style={{ transform: 'rotate3d(1, 1, 1, 15deg)' }}
            animate={{ rotateX: [0, 5, 0], rotateY: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-1 bg-gray-900 rounded-lg overflow-hidden">
            <YouTube
              videoId="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
              opts={{
                height: '378',
                width: '628',
                playerVars: {
                  autoplay: 0,
                },
              }}
            />
          </div>
        </div>
      </motion.div>
      <motion.div 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[
          { title: 'Idea Generation', description: 'Get inspired with AI-powered project ideas tailored to your interests.' },
          { title: 'Instant Feedback', description: 'Receive constructive feedback on your hackathon ideas in real-time.' },
          { title: 'Resume Parsing', description: 'Extract key information from your resume to match you with the perfect project.' },
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShimmerText className="text-xl font-semibold mb-2 text-teal-400">{feature.title}</ShimmerText>
            <p className="text-teal-200">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}


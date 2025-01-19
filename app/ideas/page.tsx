'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShimmerText } from '@/components/ShimmerText'

export default function IdeasPage() {
  const [prompt, setPrompt] = useState('')
  const [ideas, setIdeas] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateIdeas = async () => {
    setIsLoading(true)
    // Placeholder for Groq API integration
    setTimeout(() => {
      setIdeas([
        "A blockchain-based voting system for student organizations",
        "An AI-powered personal study assistant for remote learning",
        "A gamified app to encourage sustainable habits on campus"
      ])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        <ShimmerText className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Generate Hackathon Ideas
        </ShimmerText>
      </h1>
      <div className="max-w-xl mx-auto">
        <motion.div 
          className="flex space-x-2 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            placeholder="Enter a theme or topic for your hackathon idea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow bg-gray-800 text-teal-100 border-teal-700"
          />
          <Button onClick={generateIdeas} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700 text-white">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </motion.div>
        <AnimatePresence>
          {ideas.length > 0 && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {ideas.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800 border-teal-700">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-teal-400">Idea {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-teal-100">{idea}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


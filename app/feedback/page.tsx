'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShimmerText } from '@/components/ShimmerText'

export default function FeedbackPage() {
  const [idea, setIdea] = useState('')
  const [feedback, setFeedback] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateFeedback = async () => {
    setIsLoading(true)
    // Placeholder for Groq API integration
    setTimeout(() => {
      setFeedback([
        "Your idea has potential, but consider focusing on a specific target audience.",
        "Think about how you can make your solution more scalable.",
        "It would be great to add a feature that addresses privacy concerns."
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
          Get Feedback on Your Idea
        </ShimmerText>
      </h1>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Textarea
            placeholder="Enter your hackathon idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            className="mb-4 bg-gray-800 text-teal-100 border-teal-700"
          />
          <Button onClick={generateFeedback} disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
            {isLoading ? 'Generating Feedback...' : 'Get Feedback'}
          </Button>
        </motion.div>
        <AnimatePresence>
          {feedback.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="mt-8 bg-gray-800 border-teal-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-teal-400">Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feedback.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-teal-400 mr-2">•</span>
                        <span className="text-teal-100">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


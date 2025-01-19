'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Loader2, User, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShimmerText } from '@/components/ShimmerText'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    const newMessage = { role: 'user', content: input }
    setMessages([...messages, newMessage])
    setInput('')

    // Placeholder for Groq API integration
    setTimeout(() => {
      const botReply = { role: 'assistant', content: `Here's a response to "${input}". This is a placeholder response and will be replaced with actual AI-generated content in the future.` }
      setMessages(prevMessages => [...prevMessages, botReply])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-8 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        <ShimmerText className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Chat with Hackathon Helper
        </ShimmerText>
      </h1>
      <Card className="mb-4 bg-gray-800 border-teal-700">
        <CardContent className="p-4">
          <motion.div 
            className="h-[400px] overflow-y-auto space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-[70%] p-3 rounded-lg ${message.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-teal-100'}`}>
                    <div className="flex items-center mb-1">
                      {message.role === 'user' ? <User className="h-4 w-4 mr-2" /> : <Bot className="h-4 w-4 mr-2" />}
                      <span className="font-semibold">{message.role === 'user' ? 'You' : 'Assistant'}</span>
                    </div>
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>
        </CardContent>
      </Card>
      <motion.div 
        className="flex space-x-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-grow bg-gray-800 text-teal-100 border-teal-700"
        />
        <Button onClick={sendMessage} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700 text-white">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </motion.div>
    </motion.div>
  )
}


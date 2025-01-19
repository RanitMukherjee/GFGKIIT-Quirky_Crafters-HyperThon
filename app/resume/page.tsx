'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShimmerText } from '@/components/ShimmerText'

export default function ResumePage() {
  const [parsedData, setParsedData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    // Placeholder for PDF parsing and database integration
    setTimeout(() => {
      setParsedData({
        name: "John Doe",
        email: "john@example.com",
        skills: ["JavaScript", "React", "Node.js"],
        experience: [
          {
            company: "Tech Co",
            position: "Software Developer",
            duration: "2020-2023"
          }
        ]
      })
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
          Upload Your Resume
        </ShimmerText>
      </h1>
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-gray-800 border-teal-700">
            <CardContent className="p-6">
              <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-teal-600 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-teal-400" />
                  <p className="mb-2 text-sm text-teal-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-teal-400">PDF (MAX. 5MB)</p>
                </div>
                <input id="resume-upload" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
              </label>
            </CardContent>
          </Card>
        </motion.div>
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
              <span className="ml-2 text-teal-300">Parsing resume...</span>
            </motion.div>
          )}
          {parsedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-teal-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-teal-400">Parsed Resume Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-lg font-semibold text-teal-300">Personal Information</h3>
                      <p className="text-teal-100">Name: {parsedData.name}</p>
                      <p className="text-teal-100">Email: {parsedData.email}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-teal-300">Skills</h3>
                      <ul className="list-disc list-inside text-teal-100">
                        {parsedData.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold text-teal-300">Experience</h3>
                      {parsedData.experience.map((exp, index) => (
                        <div key={index} className="mb-2">
                          <p className="text-teal-100">{exp.position} at {exp.company}</p>
                          <p className="text-teal-300">{exp.duration}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

const groq = new Groq()

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for hackathon participants, providing guidance and answering questions about hackathons, project ideas, and technical challenges.',
        },
        ...messages,
      ],
      model: 'llama3-70b',
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Error in chat:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}


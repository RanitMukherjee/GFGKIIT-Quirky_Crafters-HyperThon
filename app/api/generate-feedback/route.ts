import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

const groq = new Groq()

export async function POST(req: Request) {
  const { idea } = await req.json()

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides constructive feedback on hackathon ideas.',
        },
        {
          role: 'user',
          content: `Provide constructive feedback on the following hackathon idea: ${idea}`,
        },
      ],
      model: 'llama3-70b',
    })

    const feedback = completion.choices[0]?.message?.content || 'No feedback generated.'

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error generating feedback:', error)
    return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 })
  }
}


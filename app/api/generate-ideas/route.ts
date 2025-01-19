import { NextResponse } from 'next/server'
import { Groq } from 'groq-sdk'

const groq = new Groq()

export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates creative hackathon ideas based on given themes or topics.',
        },
        {
          role: 'user',
          content: `Generate 3 creative hackathon ideas based on the following theme or topic: ${prompt}`,
        },
      ],
      model: 'llama3-70b',
    })

    const ideas = completion.choices[0]?.message?.content || 'No ideas generated.'

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Error generating ideas:', error)
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 })
  }
}


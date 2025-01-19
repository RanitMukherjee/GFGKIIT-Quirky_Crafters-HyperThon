import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import pdf from 'pdf-parse'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('resume') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const buffer = await file.arrayBuffer()
    const data = await pdf(buffer)
    const text = data.text

    // Store the parsed text in Supabase
    const { data: insertData, error } = await supabase
      .from('resumes')
      .insert({ content: text })

    if (error) throw error

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error parsing resume:', error)
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 })
  }
}


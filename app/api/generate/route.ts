import { NextResponse } from 'next/server';
import { config } from '../../config';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { prompt, type, temperature } = await req.json();

    // Validate input
    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const generationType = config.generationTypes[type as keyof typeof config.generationTypes];
    if (!generationType) {
      return NextResponse.json(
        { error: 'Invalid generation type' },
        { status: 400 }
      );
    }

    // Call Ollama API
    const response = await fetch(`${config.ollamaEndpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        prompt: `${generationType.systemPrompt}\n\n${prompt}`,
        temperature: temperature || config.defaultTemperature,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate text');
    }

    const data = await response.json();
    
    // Log the generation to a file
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      prompt,
      response: data.response,
      temperature,
    };
    
    fs.appendFileSync(
      path.join(process.cwd(), 'generations.log'),
      JSON.stringify(logEntry) + '\n'
    );

    return NextResponse.json({ text: data.response });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate text' },
      { status: 500 }
    );
  }
} 
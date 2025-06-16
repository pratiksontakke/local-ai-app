'use client';

import React, { useState } from 'react';
import { GenerationForm } from './components/GenerationForm';

export default function Home() {
  const [generatedText, setGeneratedText] = useState('');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Local AI Writer</h1>
          <p className="text-gray-600">
            Generate blog intros, tweets, and stories using local LLM inference
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <GenerationForm onGenerate={setGeneratedText} />
        </div>

        {generatedText && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Generated Text</h2>
            <div className="whitespace-pre-wrap">{generatedText}</div>
          </div>
        )}
      </div>
    </main>
  );
} 
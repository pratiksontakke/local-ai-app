'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from './Button';
import { config } from '../config';

type GenerationType = keyof typeof config.generationTypes;

interface GenerationFormProps {
  onGenerate: (text: string) => void;
}

export function GenerationForm({ onGenerate }: GenerationFormProps) {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<GenerationType>('blog');
  const [temperature, setTemperature] = useState<number>(config.defaultTemperature);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          type,
          temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate text');
      }

      onGenerate(data.text);
      setPrompt('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Generation Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as GenerationType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.entries(config.generationTypes).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Topic
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
          placeholder="Enter your topic here..."
        />
      </div>

      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
          Temperature: {temperature}
        </label>
        <input
          type="range"
          id="temperature"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="mt-1 block w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Conservative</span>
          <span>Creative</span>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        Generate
      </Button>
    </form>
  );
} 
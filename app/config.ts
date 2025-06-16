export const config = {
  // Ollama API endpoint
  ollamaEndpoint: 'http://localhost:11434',
  
  // Model settings
  model: 'mistral',
  defaultTemperature: 0.7,
  
  // Generation types
  generationTypes: {
    blog: {
      label: 'Blog Introduction',
      systemPrompt: 'You are a professional blog writer. Write a compelling blog introduction for the following topic:',
    },
    tweet: {
      label: 'Tweet',
      systemPrompt: 'You are a social media expert. Write an engaging tweet about the following topic:',
    },
    story: {
      label: 'Short Story',
      systemPrompt: 'You are a creative writer. Write a short story about the following topic:',
    },
  },
} as const; 
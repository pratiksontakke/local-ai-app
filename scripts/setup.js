const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkOllama() {
  try {
    execSync('ollama --version');
    console.log('✅ Ollama is installed');
    return true;
  } catch (error) {
    console.error('❌ Ollama is not installed');
    console.log('Please install Ollama from https://ollama.ai/');
    return false;
  }
}

async function checkModel() {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    
    const data = await response.json();
    const hasModel = data.models?.some(model => model.name === 'mistral');
    
    if (hasModel) {
      console.log('✅ Mistral model is available');
      return true;
    } else {
      console.log('⏳ Pulling Mistral model...');
      execSync('ollama pull mistral');
      console.log('✅ Mistral model pulled successfully');
      return true;
    }
  } catch (error) {
    console.error('❌ Failed to check/pull model:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Checking requirements...\n');
  
  const ollamaInstalled = checkOllama();
  if (!ollamaInstalled) {
    process.exit(1);
  }
  
  const modelAvailable = await checkModel();
  if (!modelAvailable) {
    process.exit(1);
  }
  
  console.log('\n✨ Setup completed successfully!');
}

main().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
}); 
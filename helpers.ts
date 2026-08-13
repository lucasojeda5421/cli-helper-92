import fs from 'fs';
import path from 'path';

interface Config {
  apiKey: string;
  timeout: number;
  retries: number;
}

const defaultConfig: Config = {
  apiKey: '', // Must be set
  timeout: 5000,
  retries: 3,
};

const loadConfig = (filePath: string): Config => {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return defaultConfig;
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  try {
    const userConfig: Config = JSON.parse(fileContent);
    return { ...defaultConfig, ...userConfig }; 
  } catch (error) {
    console.error('Error parsing config file:', error);
    return defaultConfig;
  }
};

export { loadConfig };
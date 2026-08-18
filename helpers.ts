import fs from 'fs';
import path from 'path';

interface Config {
  apiKey: string;
  timeout: number;
  retries: number;
}

const defaultConfig: Config = {
  apiKey: 'default_api_key',
  timeout: 5000,
  retries: 3,
};

function loadConfig(configPath: string): Config {
  let userConfig: Partial<Config> = {};
  try {
    const configFilePath = path.resolve(configPath);
    const fileContent = fs.readFileSync(configFilePath, 'utf-8');
    userConfig = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load configuration:', error);
  }
  return { ...defaultConfig, ...userConfig };
}

export { loadConfig };
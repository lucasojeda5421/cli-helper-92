import { readFileSync } from 'fs';

interface Config {
  apiUrl: string;
  timeout: number;
}

const loadConfig = (filePath: string): Config => {
  try {
    const data = readFileSync(filePath, 'utf8');
    const config = JSON.parse(data);

    if (!config.apiUrl || typeof config.apiUrl !== 'string') {
      throw new Error('Invalid or missing apiUrl in config');
    }
    if (!config.timeout || typeof config.timeout !== 'number') {
      throw new Error('Invalid or missing timeout in config');
    }

    return { apiUrl: config.apiUrl, timeout: config.timeout };
  } catch (error) {
    console.error(`Error loading config: ${error.message}`);
    process.exit(1);
  }
};

export default loadConfig;

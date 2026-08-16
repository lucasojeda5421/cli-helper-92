import * as fs from 'fs';
import * as path from 'path';

interface Config {
    apiKey: string;
    apiSecret: string;
    baseUrl: string;
}

const defaultConfig: Config = {
    apiKey: 'default_api_key',
    apiSecret: 'default_api_secret',
    baseUrl: 'https://api.default.com',
};

function loadConfig(configPath: string): Config {
    const fullPath = path.resolve(configPath);
    if (fs.existsSync(fullPath)) {
        const rawConfig = fs.readFileSync(fullPath, 'utf-8');
        return { 
            ...defaultConfig, 
            ...JSON.parse(rawConfig), 
        };
    }
    return defaultConfig;
}

export { loadConfig, Config };
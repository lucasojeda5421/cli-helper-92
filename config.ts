import * as fs from 'fs';
import * as path from 'path';

interface Config {
    host: string;
    port: number;
    apiKey: string;
}

const defaultConfig: Config = {
    host: 'localhost',
    port: 3000,
    apiKey: 'default-api-key',
};

const loadConfig = (filePath: string): Config => {
    if (!fs.existsSync(filePath)) {
        return defaultConfig;
    }
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const userConfig: Partial<Config> = JSON.parse(rawData);
    return { ...defaultConfig, ...userConfig };
};

const configFilePath = path.resolve(__dirname, 'config.json');
const configuration = loadConfig(configFilePath);

export default configuration;

import * as fs from 'fs';
import * as path from 'path';

type Config = {  
    apiKey: string;
    apiSecret: string;
    timeout: number;
};

const defaultConfig: Config = {  
    apiKey: '',  
    apiSecret: '',  
    timeout: 5000,
};

const loadConfig = (configPath: string): Config => {  
    try {  
        const fullPath = path.resolve(configPath);
        const data = fs.readFileSync(fullPath, 'utf-8');  
        const userConfig: Partial<Config> = JSON.parse(data);  
        return { ...defaultConfig, ...userConfig };  
    } catch (error) {  
        console.warn('Could not load config. Using defaults.');  
        return defaultConfig;  
    }
};

export default loadConfig;

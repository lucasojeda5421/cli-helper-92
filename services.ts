import { validateInput } from './utils';

interface InputData {
    name: string;
    age: number;
}

export function processInput(input: InputData): void {
    const { name, age } = input;
    if (!validateInput(name, age)) {
        throw new Error('Invalid input');
    }
    console.log(`Processing: ${name}, Age: ${age}`);
}

export function mainLoop(inputs: InputData[]): void {
    for (const input of inputs) {
        try {
            processInput(input);
        } catch (error) {
            console.error(`Error processing input: ${(error as Error).message}`);
        }
    }
}

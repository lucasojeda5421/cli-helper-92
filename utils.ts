export function validateInput(input: string): boolean {
    const trimmedInput = input.trim();
    return trimmedInput.length > 0 && /^[a-zA-Z0-9 ]+$/.test(trimmedInput);
}

export function processInput(input: string): void {
    if (!validateInput(input)) {
        throw new Error('Invalid input. Only alphanumeric characters and spaces are allowed.');
    }
    console.log(`Processed input: ${input}`);
}

export function mainLoop(inputs: string[]): void {
    for (const input of inputs) {
        try {
            processInput(input);
        } catch (error) {
            console.error(error.message);
        }
    }
}

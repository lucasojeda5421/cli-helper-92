function validateInput(input: string | number): boolean {
    if (typeof input === 'string') {
        return input.trim().length > 0;
    }
    return typeof input === 'number' && !isNaN(input);
}

function processInput(input: string | number): string {
    if (!validateInput(input)) {
        throw new Error('Invalid input');
    }
    return `Processed: ${input}`;
}

function mainLoop(inputs: Array<string | number>) {
    inputs.forEach(input => {
        try {
            const result = processInput(input);
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    });
}

export { validateInput, processInput, mainLoop };
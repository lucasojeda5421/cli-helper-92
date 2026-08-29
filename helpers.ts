interface CryptoCache {
get(input: string): string;
batchGet(inputs: string[]): string[];
clear(): void;
}

const cache = new Map<string, string>();

function hash(input: string): string {
let h = 0;
for (let i = 0; i < input.length; i++) {
h = (h << 5) - h + input.charCodeAt(i);
h = h & h;
}
return (h >>> 0).toString(16);
}

const helpers: CryptoCache = {
get(input: string): string {
if (cache.has(input)) {
return cache.get(input)!;
}
const result = hash(input);
cache.set(input, result);
return result;
},
batchGet(inputs: string[]): string[] {
return inputs.map((input) => helpers.get(input));
},
clear(): void {
cache.clear();
}
};

export default helpers;
export { helpers, CryptoCache };
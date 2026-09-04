export function parseHex(hex: string): Uint8Array {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (!/^[0-9a-fA-F]*$/.test(cleanHex)) {
    throw new Error("Invalid hex character sequence");
  }
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Hex string must have an even length");
  }
  const result = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    result[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return result;
}

export function validateEthAddress(address: string): string {
  if (!address || typeof address !== "string") {
    throw new TypeError("Address must be a non-empty string");
  }
  const cleanAddress = address.toLowerCase().trim();
  if (!/^0x[0-9a-f]{40}$/.test(cleanAddress)) {
    throw new Error("Invalid Ethereum address format");
  }
  return cleanAddress;
}

export function safeParseAmount(amount: string, decimals: number): bigint {
  if (decimals < 0 || decimals > 18 || !Number.isInteger(decimals)) {
    throw new RangeError("Decimals must be an integer between 0 and 18");
  }
  const trimmed = amount.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    throw new Error("Invalid numeric format for amount");
  }
  const [integerPart, fractionalPart = ""] = trimmed.split(".");
  const paddedFraction = fractionalPart.slice(0, decimals).padEnd(decimals, "0");
  try {
    const integerVal = BigInt(integerPart) * 10n ** BigInt(decimals);
    const fractionalVal = BigInt(paddedFraction);
    return integerVal + fractionalVal;
  } catch {
    throw new Error("Value overflow or parse failure");
  }
}
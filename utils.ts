type CryptoData = { symbol: string; price: number; timestamp: Date; };

const fetchCryptoData = async (symbol: string): Promise<CryptoData> => {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
    const data = await response.json();
    const price = data[symbol].usd;
    return { symbol, price, timestamp: new Date() };
};

const formatCryptoData = (data: CryptoData): string => {
    return `Symbol: ${data.symbol}, Price: $${data.price.toFixed(2)}, Time: ${data.timestamp.toISOString()}`;
};

export { fetchCryptoData, formatCryptoData, CryptoData };
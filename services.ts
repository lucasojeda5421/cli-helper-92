/**
 * Crypto market data and gas estimation service.
 */

export interface TokenPrice {
  symbol: string;
  priceUsd: number;
  change24h: number;
}

export interface GasEstimate {
  low: number;
  standard: number;
  fast: number;
}

export class CryptoService {
  private readonly baseUrl: string;

  /**
   * Initializes the crypto service with an optional API base URL.
   * @param baseUrl Base URL for crypto market API
   */
  constructor(baseUrl: string = "https://api.coingecko.com/api/v3") {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetches the current USD price and 24h change for a token.
   * @param tokenId Unique ID of the token (e.g., 'bitcoin', 'ethereum')
   * @returns Formatted token price information
   */
  public async getTokenPrice(tokenId: string): Promise<TokenPrice> {
    const url = `${this.baseUrl}/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch price data for ${tokenId}`);
    }
    const data = (await response.json()) as Record<string, { usd: number; usd_24h_change?: number }>;
    const tokenData = data[tokenId];
    if (!tokenData) {
      throw new Error(`Token ${tokenId} not found in response`);
    }
    return {
      symbol: tokenId.toUpperCase(),
      priceUsd: tokenData.usd,
      change24h: tokenData.usd_24h_change ?? 0,
    };
  }

  /**
   * Calculates estimated transaction fees in Gwei based on priority level.
   * @param baseFee Current base fee of the network in Gwei
   * @returns Estimated gas fees for different priority levels
   */
  public calculateGasEstimate(baseFee: number): GasEstimate {
    return {
      low: Math.round(baseFee * 1.1),
      standard: Math.round(baseFee * 1.25),
      fast: Math.round(baseFee * 1.5),
    };
  }
}

export interface CryptoConfig {
  apiKey: string;
  apiSecret: string;
  exchange: 'binance' | 'coinbase' | 'kraken';
  network: 'mainnet' | 'testnet';
  timeout: number;
  maxRetries: number;
}

export interface WalletConfig {
  address: string;
  privateKey: string;
  chainId: number;
}

/**
 * Main configuration for the CLI crypto helper
 */
export class ConfigManager {
  private cryptoConfig: CryptoConfig;
  private walletConfig: WalletConfig | null;

  /**
   * Initializes the config manager with provided configurations
   * @param cryptoConfig Configuration for crypto API access
   * @param walletConfig Optional wallet configuration
   */
  constructor(cryptoConfig: CryptoConfig, walletConfig?: WalletConfig) {
    this.cryptoConfig = cryptoConfig;
    this.walletConfig = walletConfig || null;
  }

  /**
   * Retrieves the crypto configuration
   * @returns The current crypto config
   */
  getCryptoConfig(): CryptoConfig {
    return { ...this.cryptoConfig };
  }

  /**
   * Retrieves the wallet configuration if available
   * @returns The wallet config or null
   */
  getWalletConfig(): WalletConfig | null {
    return this.walletConfig ? { ...this.walletConfig } : null;
  }

  /**
   * Updates the timeout setting in crypto config
   * @param timeout New timeout value in milliseconds
   */
  setTimeout(timeout: number): void {
    if (timeout > 0) {
      this.cryptoConfig.timeout = timeout;
    }
  }

  /**
   * Checks if the configuration is valid for operations
   * @returns Boolean indicating validity
   */
  isValid(): boolean {
    const { apiKey, apiSecret, timeout, maxRetries } = this.cryptoConfig;
    return apiKey.length > 10 && apiSecret.length > 10 && timeout >= 1000 && maxRetries > 0;
  }

  /**
   * Returns a summary of the current configuration
   * @returns Object with key config details
   */
  getSummary(): { exchange: string; network: string; hasWallet: boolean } {
    return {
      exchange: this.cryptoConfig.exchange,
      network: this.cryptoConfig.network,
      hasWallet: this.walletConfig !== null
    };
  }
}
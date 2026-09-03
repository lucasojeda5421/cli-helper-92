export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
  explorerUrl?: string;
}

export interface CliConfig {
  defaultNetwork: string;
  gasLimitMultiplier: number;
  networks: Record<string, NetworkConfig>;
}

/**
 * Manages configuration parameters for blockchain network connections.
 */
export class ConfigManager {
  private config: CliConfig;

  /**
   * Initializes CLI helper config with default EVM networks.
   */
  constructor() {
    this.config = {
      defaultNetwork: 'mainnet',
      gasLimitMultiplier: 1.2,
      networks: {
        mainnet: {
          rpcUrl: 'https://eth.llamarpc.com',
          chainId: 1,
          explorerUrl: 'https://etherscan.io'
        },
        sepolia: {
          rpcUrl: 'https://ethereum-sepolia.publicnode.com',
          chainId: 11155111,
          explorerUrl: 'https://sepolia.etherscan.io'
        }
      }
    };
  }

  /**
   * Retrieves current CLI configuration settings.
   */
  public getConfig(): CliConfig {
    return this.config;
  }

  /**
   * Returns configurations for target chain network.
   * 
   * @param name - The registered blockchain identifier
   * @returns Config details for requested network
   */
  public getNetwork(name: string): NetworkConfig {
    const network = this.config.networks[name];
    if (!network) {
      throw new Error(`Network '${name}' is not configured in environment`);
    }
    return network;
  }
}
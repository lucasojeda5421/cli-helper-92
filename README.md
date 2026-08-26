# cli-helper-92

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

`cli-helper-92` is a high-performance command-line interface designed to streamline crypto portfolio tracking and smart contract interaction. It provides developers and traders with instant terminal access to decentralized exchange liquidity pools, gas estimations, and wallet balances without switching contexts.

## Features

- **Multi-Chain Wallet Tracking:** Monitor ETH, Polygon, and Arbitrum wallet balances and recent transactions natively from your terminal.
- **Real-Time Gas Oracle:** Fetch optimized gas fees across multiple networks instantly to execute timely transactions with minimal slippage.
- **DEX Price Aggregator:** Query live token swap rates and liquidity data from Uniswap V3 and Sushiswap directly via RPC endpoints.
- **Secure Key Management:** Encrypt and store private keys locally using AES-256-GCM encryption with seamless environment variable fallback.

## Installation

Ensure you have Node.js version 18 or higher installed on your system. Install the CLI globally using npm:

```bash
npm install -g cli-helper-92
```

Alternatively, run it on-the-fly via npx:

```bash
npx cli-helper-92 --version
```

## Usage

Initialize your configuration file and set up your default RPC provider:

```bash
cli-helper-92 init
```

Check the native token balance of a specific Ethereum address:

```bash
cli-helper-92 balance 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 --network mainnet
```

Estimate current gas fees for a priority transaction:

```bash
cli-helper-92 gas --network arbitrum
```

For a complete list of available commands and global flags, run:

```bash
cli-helper-92 --help
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or feature additions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# cli-helper-92

A high-performance TypeScript CLI toolkit designed to streamline on-chain data retrieval and wallet management tasks. It provides developers with a robust, type-safe interface for interacting with EVM-compatible networks directly from the terminal.

## Features

*   **Real-time Gas Estimation:** Fetches accurate, network-specific gas fees to ensure optimal transaction prioritization.
*   **Encrypted Key Storage:** Implements local, AES-256 encrypted keystore management for secure automated transaction signing.
*   **Smart Contract Interaction:** Auto-generates CLI commands from ABI JSON files, allowing for seamless method execution without manual boilerplate.
*   **Balance Aggregation:** Multi-chain portfolio tracking with native support for ERC-20 token balance lookups across major mainnets.

## Installation

Install the package globally via npm:

```bash
npm install -g cli-helper-92
```

## Basic Usage

Initialize a new project workspace and configure your network provider:

```bash
# Initialize project configuration
cli-helper-92 init

# Fetch balance for a specific address
cli-helper-92 balance --address 0x123...abc --network mainnet

# Execute a contract function using a local ABI file
cli-helper-92 call --abi ./contract.json --method balanceOf --args 0x456...def
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
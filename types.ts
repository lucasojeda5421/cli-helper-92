export enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVNET = 'devnet'
}

export type Address = string

export type Hash = string

export type Amount = bigint

export interface KeyPair {
  publicKey: string
  privateKey: string
}

export interface Wallet {
  id: string
  address: Address
  keyPair: KeyPair
  balance: Amount
}

export type TransactionStatus = 'pending' | 'confirmed' | 'failed' | 'reverted'

export interface Transaction {
  hash: Hash
  from: Address
  to: Address
  value: Amount
  fee: Amount
  status: TransactionStatus
  timestamp: number
  nonce: number
  data?: string
}

export interface Block {
  height: number
  hash: Hash
  timestamp: number
  transactions: Transaction[]
  previousHash: Hash
  miner: Address
}

export interface SignedTransaction extends Transaction {
  signature: string
}

export interface CryptoConfig {
  network: Network
  rpcEndpoint: string
  apiKey?: string
  gasLimit: number
  timeoutMs: number
}

export type CLIArgs = string[]

export interface Command {
  name: string
  description: string
  handler: (args: CLIArgs) => Promise<void>
}

export type ErrorCode = 400 | 401 | 404 | 500

export interface AppError extends Error {
  code: ErrorCode
  context?: Record<string, unknown>
}
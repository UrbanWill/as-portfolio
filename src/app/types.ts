export interface TokenBalance {
  tokenName: string;
  tokenBalance: string;
}

export interface MultiCall {
  blockNumber: number;
  tokenBalances: TokenBalance[];
}

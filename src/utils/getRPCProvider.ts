import { ethers } from "ethers";

// Constants
import { ChainId } from "@/constants/chains";

// TODO: Add RPC urls for other chains
const providerUrls: Record<ChainId, string> = {
  [ChainId.MAINNET]: "",
  [ChainId.BSC]: "https://bsc-dataseed2.binance.org/",
  [ChainId.POLYGON]: "",
  [ChainId.ARBITRUM]: "",
  [ChainId.MATIC_MUMBAI]: "",
  [ChainId.BSC_TESTNET]: "",
};

const providers: Record<number, ethers.providers.JsonRpcProvider> = {};

// Helper function to get RPC provider
export default function getRPCProvider(chainId: ChainId) {
  if (!providers[chainId]) {
    providers[chainId] = new ethers.providers.JsonRpcProvider(
      providerUrls[chainId]
    );
  }
  return providers[chainId];
}

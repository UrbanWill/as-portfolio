import { ethers } from "ethers";

// Constants
import { ChainId } from "@/constants/chains";

const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

const providerUrls: Record<ChainId, string> = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [ChainId.BSC]: "https://bsc-dataseed2.binance.org/",
  [ChainId.MATIC]: `https://polygon-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [ChainId.ARBITRUM]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  [ChainId.MATIC_MUMBAI]: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJECT_ID}`,
  [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
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

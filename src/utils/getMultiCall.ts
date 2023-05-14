// Utils
import getRPCProvider from "@/utils/getRPCProvider";

// Constants
import { ChainId } from "@/constants/chains";

import { Multicall } from "ethereum-multicall";

const multicalls: Record<number, Multicall> = {};

// Helper function to get multicall instance for a given Chain
export default function getMultiCall(chainId: ChainId) {
  if (!multicalls[chainId]) {
    multicalls[chainId] = new Multicall({
      ethersProvider: getRPCProvider(chainId),
      tryAggregate: true,
    });
  }
  return multicalls[chainId];
}

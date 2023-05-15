import { ContractCallResults, ContractCallContext } from "ethereum-multicall";

// Constants
import { ChainId } from "@/constants/chains";

// Utils
import getMultiCall from "@/utils/getMultiCall";

// Helper function to get token balances using multicall
export default async function fetchTokenBalances({
  chainId,
  callContractContext,
}: {
  chainId: ChainId;
  callContractContext: ContractCallContext[];
}): Promise<ContractCallResults> {
  const multicall = getMultiCall(chainId);
  const results: ContractCallResults = await multicall.call(
    callContractContext
  );
  return results;
}

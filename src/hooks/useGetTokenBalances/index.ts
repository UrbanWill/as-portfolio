import { useQuery } from "@tanstack/react-query";
import { ContractCallResults, ContractCallContext } from "ethereum-multicall";

// Utils
import getMultiCall from "@/utils/getMultiCall";
import getCallContractContext from "./getCallContractContext";
import getParsedTokenValues from "./getParsedTokenBalances";

// Connectors
import { hooks } from "@/connectors/metamask";

// Constants
import { ChainId } from "@/constants/chains";

// Helper function to get token balances using multicall
const fetchTokenBalances = async ({
  chainId,
  callContractContext,
}: {
  chainId: ChainId;
  callContractContext: ContractCallContext[];
}): Promise<ContractCallResults> => {
  const multicall = getMultiCall(chainId);
  const results: ContractCallResults = await multicall.call(
    callContractContext
  );
  return results;
};

interface UseGetTokenBalances {
  isNFTIndex?: boolean;
}

export default function useGetTokenBalances({
  isNFTIndex = false,
}: UseGetTokenBalances) {
  const { useChainId, useIsActive, useAccounts } = hooks;

  const chainId = useChainId();
  const isActive = useIsActive();
  const accounts = useAccounts();

  const queryChainId = isNFTIndex ? ChainId.BSC : chainId;
  const [currentAccount] = accounts ?? [];

  const callContractContext = getCallContractContext({
    isNFTIndex,
    chainId: queryChainId!,
    walletAddress: currentAccount,
  });

  const { data, isLoading } = useQuery({
    queryKey: [queryChainId, currentAccount],
    queryFn: () =>
      fetchTokenBalances({ chainId: queryChainId!, callContractContext }),
    enabled: !!queryChainId && isActive,
    /**
     * 1 minute cache time. This is a good idea to reduce the number of calls to the RPC,
     * but you can invalidate the cache on every new block and add the new block number to queryKeys array
     */
    cacheTime: 1000 * 60,
  });

  return { isLoading, data: data ? getParsedTokenValues(data) : null };
}

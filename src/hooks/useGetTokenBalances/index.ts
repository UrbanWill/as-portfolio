import { useQuery } from "@tanstack/react-query";

// Utils
import fetchTokenBalances from "@/utils/fetchTokenBalances";
import getCallContractContext from "../../utils/getCallContractContext";
import getParsedTokenValues from "../../utils/getParsedTokenBalances";

// Connectors
import { hooks } from "@/connectors/metamask";

// Constants
import { ChainId } from "@/constants/chains";

interface UseGetTokenBalances {
  isNFTIndex?: boolean;
}

/**
 * NOTE: This hook was originally developed to fetch all token balances for the current connected chain or NFTIndexes list on BSC
 * I am keeping this functionality here because it can be useful in the future and it is a legit use case, though not being used in the app
 */
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
    queryKey: [queryChainId, currentAccount, { isNFTIndex }],
    queryFn: () =>
      fetchTokenBalances({ chainId: queryChainId!, callContractContext }),
    enabled: !!queryChainId && isActive,
    /**
     * 1 minute cache time. This is a good idea to reduce the number of calls to the RPC,
     * but you can invalidate the cache on every new block and add the new block number to queryKeys array
     */
    cacheTime: 1000 * 60,
  });

  return {
    isLoading,
    data: data
      ? getParsedTokenValues(data).sort(
          (a, b) => Number(b.tokenBalance) - Number(a.tokenBalance)
        )
      : null,
  };
}

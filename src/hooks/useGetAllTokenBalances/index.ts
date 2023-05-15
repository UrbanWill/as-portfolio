import { useQueries } from "@tanstack/react-query";

// Hooks
import { hooks } from "@/connectors/metamask";

// Utils
import fetchTokenBalances from "@/utils/fetchTokenBalances";
import getCallContractContext from "@/utils/getCallContractContext";
import getParsedTokenValues from "@/utils/getParsedTokenBalances";

// Constants
import { ChainId } from "@/constants/chains";
import { TokenBalance } from "@/app/types";

const CHAINS = [
  ChainId.MAINNET,
  ChainId.BSC,
  ChainId.MATIC,
  ChainId.ARBITRUM,
  ChainId.MATIC_MUMBAI,
  ChainId.BSC_TESTNET,
];

export default function useGetAllTokenBalances() {
  const { useAccounts } = hooks;

  const accounts = useAccounts();

  const [currentAccount] = accounts ?? [];

  const results = useQueries({
    queries: CHAINS.map((chainId) => ({
      queryKey: [chainId, currentAccount],
      queryFn: () => {
        const callContractContext = getCallContractContext({
          isNFTIndex: false,
          chainId,
          walletAddress: currentAccount,
        });

        return fetchTokenBalances({ chainId, callContractContext });
      },
      /**
       * 1 minute cache time. This is a good idea to reduce the number of calls to the RPC,
       * but you can invalidate the cache on every new block and add the new block number to queryKeys array
       */
      cacheTime: 1000 * 60,
      enabled: !!currentAccount,
    })),
  });

  const isLoading = results.some((result) => result.isLoading);

  let data: TokenBalance[] = [];

  if (!isLoading) {
    results.forEach((result) => {
      if (result.data) {
        data.push(...getParsedTokenValues(result.data));
      }
    });
  }

  /**
   * NOTE: The data here could be filtered to remove zero balances tokens,
   * I am deliberately not doing that here to showcase the smoothness of the UI using virtualized tables
   */
  return {
    data: data
      ? data.sort((a, b) => Number(b.tokenBalance) - Number(a.tokenBalance))
      : null,
    isLoading,
  };
}

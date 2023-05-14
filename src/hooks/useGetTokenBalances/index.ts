import { useQuery } from "@tanstack/react-query";
import { ContractCallResults, ContractCallContext } from "ethereum-multicall";
import { ethers } from "ethers";

// Abis
import ERC20_ABI from "@/config/abis/erc20.json";

// Utils
import getMultiCall from "@/utils/getMultiCall";

// Connectors
import { hooks } from "@/connectors/metamask";

// Constants
import { ChainId } from "@/constants/chains";
import { TokenBalance, MultiCall } from "@/app/types";

const LMI_TOKEN_CONTRACT_ADDRESS = "0x79534dedae71b7b672fc997b4a77748ae5fdf5ad";

// TODO: make this dynamic
const BSCcontractCallContext2: ContractCallContext[] = [
  {
    reference: "Non Fungible Apes Index",
    contractAddress: "0x4c48a4d089d13cb24a8a250c7051e8a3f8687460",
    abi: ERC20_ABI,
    calls: [
      {
        reference: "balanceOf",
        methodName: "balanceOf(address)",
        methodParameters: ["0xb1bb62022118d34aedaa30389de9390ac6853f4e"],
      },
    ],
  },
  {
    reference: "Liquid Monsters Index",
    contractAddress: LMI_TOKEN_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    calls: [
      {
        reference: "balanceOf",
        methodName: "balanceOf(address)",
        methodParameters: ["0x8dc4397696ddd4af057e748d39804b269d6f3205"],
      },
    ],
  },
  {
    reference: "Monsta Party Index",
    contractAddress: "0x4169a012c9620ed6c8c491d75f174a5cd94e1e47",
    abi: ERC20_ABI,
    calls: [
      {
        reference: "balanceOf",
        methodName: "balanceOf(address)",
        methodParameters: ["0x713e2d6ac290749bca9fffc6ba60c72c014fa210"],
      },
    ],
  },
];

// Helper function to get token balances using multicall
const fetchTokenBalances = async (
  chainId: ChainId
): Promise<ContractCallResults> => {
  const multicall = getMultiCall(chainId);
  const results: ContractCallResults = await multicall.call(
    BSCcontractCallContext2
  );
  return results;
};

// Helper function to parse token balances
const parseTokenBalances = (
  contractCallResults: ContractCallResults
): MultiCall => {
  const { results, blockNumber } = contractCallResults;
  const tokenBalances: TokenBalance[] = Object.keys(results).map((key) => {
    // destructs the first element of the array, which is the balanceOf call
    const {
      callsReturnContext: [balanceOf],
    } = results[key];
    // destructs the first element of the array, which is the balanceOf call returned value
    const {
      returnValues: [tokenBalance],
    } = balanceOf;
    const parsedTokenBalance = ethers.utils.formatEther(tokenBalance);

    return { tokenName: key, tokenBalance: parsedTokenBalance };
  });

  return {
    blockNumber,
    tokenBalances: tokenBalances.sort(
      (a, b) => Number(b.tokenBalance) - Number(a.tokenBalance)
    ),
  };
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

  const { data, isLoading } = useQuery({
    queryKey: [queryChainId, currentAccount],
    queryFn: () => fetchTokenBalances(queryChainId!),
    enabled: !!queryChainId && isActive,
    /**
     * 1 minute cache time. This is a good idea to reduce the number of calls to the RPC,
     * but you can invalidate the cache on every new block and add the new block number to queryKeys array
     */
    cacheTime: 1000 * 60,
  });

  return { isLoading, data: data ? parseTokenBalances(data) : null };
}

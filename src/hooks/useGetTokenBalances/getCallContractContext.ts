// Utils
import getValidTokens from "@/utils/getValidTokens";

// Abis
import ERC20_ABI from "@/config/abis/erc20.json";

// Constants
import { ChainId } from "@/constants/chains";
import { ContractCallContext } from "ethereum-multicall";

interface GetCallContractContext {
  chainId?: ChainId;
  isNFTIndex: boolean;
  walletAddress: string;
}

export default function getCallContractContext({
  chainId,
  isNFTIndex,
  walletAddress,
}: GetCallContractContext): ContractCallContext[] {
  const validTokens = getValidTokens({ isNFTIndex, chainId });

  const contractCallContext = validTokens.map((token) => ({
    reference: token.name,
    contractAddress: token.address,
    abi: ERC20_ABI,
    calls: [
      {
        reference: "balanceOf",
        methodName: "balanceOf(address)",
        methodParameters: [walletAddress],
      },
    ],
  }));
  return contractCallContext;
}

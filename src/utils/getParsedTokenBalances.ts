import { ethers } from "ethers";
import { ContractCallResults } from "ethereum-multicall";

// Types
import { TokenBalance } from "@/app/types";

/** NOTE: Write tests if shipping to prod */

// Helper function to parse token balances
export default function getParsedTokenValues(
  contractCallResults: ContractCallResults
): TokenBalance[] {
  const { results } = contractCallResults;
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

  return tokenBalances;
}

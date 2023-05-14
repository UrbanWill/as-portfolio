// Constants
import { ChainId } from "@/constants/chains";
import NFT_INDEX_LIST from "@/constants/tokenLists/nftIndex.json";
import TOKEN_LIST from "@/constants/tokenLists/apeswap.json";

interface GetValidTokens {
  chainId?: ChainId;
  isNFTIndex: boolean;
}

export default function getValidTokens({
  isNFTIndex,
  chainId,
}: GetValidTokens) {
  const tokenList = isNFTIndex
    ? NFT_INDEX_LIST.tokens
    : TOKEN_LIST.tokens.filter((token) => token.chainId === chainId);

  return tokenList;
}

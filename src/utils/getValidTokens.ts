// Constants
import { ChainId } from "@/constants/chains";
import NFT_INDEX_LIST from "@/constants/tokenLists/nftIndex.json";

interface GetValidTokens {
  chainId?: ChainId;
  isNFTIndex: boolean;
}

export default function getValidTokens({ isNFTIndex }: GetValidTokens) {
  const tokenList = isNFTIndex ? NFT_INDEX_LIST.tokens : [];

  return tokenList;
}

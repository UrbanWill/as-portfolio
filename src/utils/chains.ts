import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const BNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Bnb",
  symbol: "BNB",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: ["https://cloudflare-eth.com"].filter(Boolean),
    name: "Ethereum",
  },
  56: {
    urls: [
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io",
    ],
    name: "Binance Smart Chain",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://bscscan.com"],
  },
  137: {
    urls: ["https://polygon-rpc.com"],
    name: "Polygon",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  42161: {
    urls: ["https://arb1.arbitrum.io/rpc"],
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  80001: {
    urls: ["https://matic-mumbai.chainstacklabs.com"],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  97: {
    urls: ["https://data-seed-prebsc-2-s3.binance.org:8545/"],
    name: "Binance Smart Chain Testnet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

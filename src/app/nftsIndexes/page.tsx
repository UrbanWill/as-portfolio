"use client";

// Hooks
import useGetTokenBalances from "@/hooks/useGetTokenBalances";

export default function TokenIndexes() {
  const { isLoading, data } = useGetTokenBalances({ isNFTIndex: true });

  const NFTIndexes = data?.tokenBalances.map((token) => {
    return (
      <div key={token.tokenName} className="flex space-x-3">
        <h2>Name: {token.tokenName}</h2>
        <p>Balance: {token.tokenBalance}</p>
      </div>
    );
  });

  return (
    <main className="flex justify-center flex-col">
      <h1 className="font-bold text-2xl">Nfts Indexes Balances</h1>
      {isLoading ? <p>Loading...</p> : NFTIndexes}
    </main>
  );
}

"use client";

// Hooks
import useGetTokenBalances from "@/hooks/useGetTokenBalances";
import { hooks } from "@/connectors/metamask";

export default function Balances() {
  const { isLoading, data } = useGetTokenBalances({ isNFTIndex: false });
  const { useIsActive } = hooks;

  const isActive = useIsActive();

  const tokenBalances = data?.tokenBalances.map((token) => {
    return (
      <div key={token.tokenName} className="flex space-x-3">
        <h2>Name: {token.tokenName}</h2>
        <p>Balance: {token.tokenBalance}</p>
      </div>
    );
  });

  const getBody = () => {
    return isLoading ? <p>Loading...</p> : tokenBalances;
  };
  return (
    <main className="flex justify-center flex-col">
      <h1 className="font-bold text-2xl">Tokens Balances</h1>
      {isActive ? getBody() : <p>Connect to Metamask</p>}
    </main>
  );
}

"use client";

// Hooks
import useGetAllTokenBalances from "@/hooks/useGetAllTokenBalances";
import { hooks } from "@/connectors/metamask";

// Components
import TokenTable from "@/components/TokenTable";

export default function Balances() {
  const { isLoading, data } = useGetAllTokenBalances();
  const { useIsActive } = hooks;

  const isActive = useIsActive();

  return (
    <main className="flex justify-center flex-col">
      <h1 className="font-bold text-2xl text-center my-6 sm:my-12">
        Tokens Balances
      </h1>
      {isActive ? (
        <TokenTable isLoading={isLoading} data={data ?? []} />
      ) : (
        <p className="text-lg font-bold">Connect to Metamask</p>
      )}
    </main>
  );
}

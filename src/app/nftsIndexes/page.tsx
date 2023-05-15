"use client";

// Hooks
import useGetTokenBalances from "@/hooks/useGetTokenBalances";
import { hooks } from "@/connectors/metamask";

// Components
import TokenTable from "@/components/TokenTable";

export default function TokenIndexes() {
  const { isLoading, data } = useGetTokenBalances({ isNFTIndex: true });
  const { useIsActive } = hooks;

  const isActive = useIsActive();

  return (
    <main className="flex justify-center flex-col">
      <h1 className="font-bold text-2xl text-center my-6 sm:my-12">
        Nfts Indexes Balances
      </h1>
      {isActive ? (
        <TokenTable isLoading={isLoading} data={data?.tokenBalances ?? []} />
      ) : (
        <p>Connect to Metamask</p>
      )}
    </main>
  );
}

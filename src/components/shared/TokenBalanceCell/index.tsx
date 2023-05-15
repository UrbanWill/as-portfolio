interface TokenBalanceCellProps {
  tokenBalance: string;
  isLoading: boolean;
}

export default function TokenBalanceCell({
  tokenBalance,
  isLoading,
}: TokenBalanceCellProps) {
  return (
    <div className="flex justify-end">
      <div
        className={`font-semibold ${
          isLoading ? "bg-gray-400 animate-pulse h-6 w-28" : ""
        }`}
      >
        {!isLoading && Number(tokenBalance).toFixed(6)}
      </div>
    </div>
  );
}

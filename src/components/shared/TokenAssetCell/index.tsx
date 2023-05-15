interface TokenAssetCellProps {
  tokenName: string;
  isLoading: boolean;
}

// Shared Token Asset Cell to be used across all token asset tables
export default function TokenAssetCell({
  tokenName,
  isLoading,
}: TokenAssetCellProps) {
  return (
    <div className="font-semibold flex items-center space-x-3">
      <div
        className={`p-6 rounded-full relative uppercase ${
          isLoading ? "bg-gray-400 animate-pulse" : "border-2 border-gray-800"
        }`}
      >
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
          {!isLoading && tokenName.slice(0, 1)}
        </div>
      </div>
      <div
        className={`${isLoading ? "bg-gray-400 animate-pulse h-6 w-28" : ""}`}
      >
        {!isLoading && tokenName}
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

// Components
import TableVirtualized from "../shared/TableVirtualized";
import TokenAssetCell from "../shared/TokenAssetCell";
import TokenBalanceCell from "../shared/TokenBalanceCell";

// Types
import { TokenBalance } from "@/app/types";

interface TokenTableProps {
  isLoading: boolean;
  data: TokenBalance[];
}

export default function TokenTable({ isLoading, data }: TokenTableProps) {
  const loadingSkeletonData = Array(15).fill({
    tokenName: "Loading...",
    tokenBalance: "Loading...",
  });

  const columns = useMemo<ColumnDef<TokenBalance>[]>(
    () => [
      {
        accessorKey: "tokenName",
        header: () => <div className="text-start">Asset</div>,
        cell: ({ row: { original } }) => (
          <TokenAssetCell
            tokenName={original.tokenName}
            isLoading={isLoading}
          />
        ),
      },
      {
        accessorKey: "tokenBalance",
        header: () => <div className="text-end">Balance</div>,
        cell: ({ row: { original } }) => (
          <TokenBalanceCell
            tokenBalance={original.tokenBalance}
            isLoading={isLoading}
          />
        ),
      },
    ],
    [isLoading]
  );

  return (
    <TableVirtualized
      columns={columns}
      data={!isLoading && data ? data : loadingSkeletonData}
    />
  );
}

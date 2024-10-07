import { ColumnDef } from "@tanstack/react-table";
import { StateCountModel } from "../../../lib/features/models/ListingCountModel";

export const createColumns = (): ColumnDef<StateCountModel>[] => [
  {
    accessorKey: "state",
    header: "States",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
];

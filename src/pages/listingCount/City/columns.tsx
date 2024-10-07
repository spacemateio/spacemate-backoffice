import { ColumnDef } from "@tanstack/react-table";
import { CityStateCountModel } from "../../../lib/features/models/ListingCountModel";

export const createColumns = (): ColumnDef<CityStateCountModel>[] => [
  {
    accessorKey: "city",
    header: "City or Town",
  },
  {
    accessorKey: "state",
    header: "States",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
];

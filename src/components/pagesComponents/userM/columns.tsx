"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UserModel } from "@/lib/features/models/UserM/UserModel";

export const createColumns = (
  handleShow: (id: number) => void,
  handleActive: (id: number) => void,
  handlePassive: (id: number) => void,
  handleListing: (id: number) => void
): ColumnDef<UserModel>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: "Full Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const lastname = row.original.lastname;
      const fullName = `${name} ${lastname}`;
      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "accountType",
    header: "AccountType",
  },
  {
    accessorKey: "isVerified",
    header: "ID verified",
  },
  {
    accessorKey: "isHost",
    header: "IsHost",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div>
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleShow(id)}
          >
            Show
          </Button>{" "}
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleListing(id)}
          >
            Listing
          </Button>{" "}
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleActive(id)}
          >
            Active
          </Button>{" "}
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handlePassive(id)}
          >
            Passive
          </Button>
        </div>
      );
    },
  },
];

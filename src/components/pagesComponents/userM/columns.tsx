import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { UserModel } from "../../../lib/features/models/UserM/UserModel";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Image from "../../image/Image.tsx";

export const createColumns = (
  handleShow: (id: number) => void,
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
    accessorFn: (row) => `${row.name} ${row.lastname}`,
    id: "NAME",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.original.avatar ? (
            <Image
              src={row.original.avatar} // Ensure this field exists in the UserModel
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span>
                {row.original.name[0]}
                {row.original.lastname[0]}
              </span>
            </div>
          )}
          <span>{`${row.original.name} ${row.original.lastname}`}</span>
        </div>
      );
    },
    sortingFn: (a, b) => {
      const fullNameA = `${a.original.name} ${a.original.lastname}`;
      const fullNameB = `${b.original.name} ${b.original.lastname}`;
      return fullNameA.localeCompare(fullNameB);
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
    id: "ACCOUNT_TYPE",
    accessorKey: "accountType",
    header: "Account Type",
    cell: ({ row }) => {
      return (
        <>
          <Badge
            bgColor="rgba(194, 223, 229, 1)"
            textColor="black"
            text="Renter"
          />
          {row.original.isHost && (
            <Badge
              bgColor="rgba(233, 178, 155, 1)"
              textColor="rgba(197, 83, 35, 1)"
              text="Host"
            />
          )}
        </>
      );
    },
  },
  {
    id: "ID_VERIFIED",
    accessorKey: "isVerified",
    header: "ID Verified",
    cell: ({ row }) => {
      if (row.original.isVerified) {
        return (
          <Badge
            bgColor="rgba(186, 242, 199, 1)"
            textColor="rgba(36, 125, 55, 1)"
            text="Verified"
          />
        );
      } else {
        return (
          <Badge
            bgColor="rgba(253, 205, 205, 1)"
            textColor="rgba(127, 57, 57, 1)"
            text="Not Verified"
          />
        );
      }
    },
  },
  {
    id: "REGISTER_DATE",
    accessorKey: "createDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Register Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12 saatlik sistemi kullanmak için
      };
      return new Date(row.original.createDate).toLocaleString("en-US", options);
      return;
    },
  },
  {
    id: "EMAIL_VERIFICATION",
    accessorKey: "status",
    header: "Email Verification",
    cell: ({ row }) => {
      if (row.original.status) {
        return (
          <Badge
            bgColor="rgba(186, 242, 199, 1)"
            textColor="rgba(36, 125, 55, 1)"
            text="Verified"
          />
        );
      } else {
        return (
          <Badge
            bgColor="rgba(253, 205, 205, 1)"
            textColor="rgba(127, 57, 57, 1)"
            text="Not Verified"
          />
        );
      }
    },
  },
  {
    id: "REF_CODE",
    accessorKey: "refCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          REF Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
            User Id
          </Button>{" "}
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleListing(id)}
          >
            Listing
          </Button>
        </div>
      );
    },
  },
];

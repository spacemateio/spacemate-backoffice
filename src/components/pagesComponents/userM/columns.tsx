import { ColumnDef } from "@tanstack/react-table";
import { UserModel } from "../../../lib/features/models/UserM/UserModel";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Image from "../../image/Image.tsx";
import { getBadgeStyles } from "../../../lib/features/models/AccountType.ts";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";

export const createColumns = (
  handleShow: (id: number) => void,
  handleListing: (id: number) => void
): ColumnDef<UserModel>[] => [
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
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
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
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
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
          {!row.original.isHost && (
            <Badge bgColor="#C2DFE5" textColor="#243944" text="R" />
          )}
          {row.original.isHost && (
            <div className="flex gap-1">
              <Badge bgColor="#C2DFE5" textColor="#243944" text="R" />
              <Badge
                bgColor="rgba(233, 178, 155, 1)"
                textColor="rgba(197, 83, 35, 1)"
                text="H"
              />
            </div>
          )}
        </>
      );
    },
  },
  {
    id: "REGISTER_TYPE",
    header: "Register Type",
    cell: ({ row }) => {
      const { bgColor, textColor, text } = getBadgeStyles(
        row.original.accountType
      );

      return <Badge bgColor={bgColor} textColor={textColor} text={text} />;
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
            text="Unverified"
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
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createDate);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      return localDate.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
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
            text="Unverified"
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
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
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
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleShow(id)}
          >
            <IconDisplay iconName="Eye" addStyle="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleListing(id)}
          >
            <IconDisplay iconName="List" addStyle="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

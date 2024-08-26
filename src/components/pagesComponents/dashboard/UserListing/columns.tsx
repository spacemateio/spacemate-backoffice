import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { UserModel } from "../../../../lib/features/models/UserM/UserModel";
import { getBadgeStyles } from "../../../../lib/features/models/AccountType.ts";
import Image from "../../../image/Image.tsx";
import IconDisplay from "../../../iconComponent/IconDisplay.tsx";

export const createColumns = (
  handleShow: (id: number) => void
): ColumnDef<UserModel>[] => [
  {
    accessorFn: (row) => `${row.name} ${row.lastname}`,
    id: "NAME",
    header: "Full Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.original.avatar ? (
            <Image
              src={row.original.avatar} // Ensure this field exists in the UserModel
              alt=""
              width={32}
              height={32}
              className="rounded-full object-cover" // Ensures the image is circular and covers the area
              style={{ width: "32px", height: "32px" }} // Fixes the size of the image
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">
                {row.original.name[0]}
                {row.original.lastname[0]}
              </span>
            </div>
          )}
          <span>{`${row.original.name} ${row.original.lastname}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button
          variant="outline"
          size="sxm"
          style={{ fontSize: "12px" }}
          onClick={() => handleShow(id)}
        >
          <IconDisplay iconName="Eye" addStyle="h-4 w-4" />
        </Button>
      );
    },
  },
];

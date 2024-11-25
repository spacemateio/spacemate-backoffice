import { ColumnDef } from "@tanstack/react-table";
import { AdModel } from "../../../../lib/features/models/AdM/AdModel.tsx";
import { Button } from "../../../ui/button.tsx";
import IconDisplay from "../../../iconComponent/IconDisplay.tsx";
import { formatLocalDateTime } from "../../../../lib/helpers/dateHelpers.ts";

export const createColumns = (
  handleShow: (id: number) => void
): ColumnDef<AdModel>[] => [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const truncatedText =
        row.original.title.length > 30
          ? row.original.title.slice(0, 30) + "..."
          : row.original.title;
      return <>{truncatedText}</>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <>{`$${row.original.price}`}</>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      return <span>{formatLocalDateTime(row.original.created)}</span>;
      /*const date = new Date(row.original.created);
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
      });*/
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
        </div>
      );
    },
  },
];

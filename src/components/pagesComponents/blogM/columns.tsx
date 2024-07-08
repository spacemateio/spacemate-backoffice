import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { Button } from "../../ui/button.tsx";

export const createColumns = (
  handleShow: (id: number) => void,
  handleActive: (id: number) => void,
  handlePassive: (id: number) => void,
  handleDelete: (id: number) => void,
): ColumnDef<BlogModel>[] => [
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
    accessorKey: "id",
    header: "Id",
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
    accessorKey: "subtitle",
    header: "Subtitle",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "imageExtId",
    header: "ImageExtId",
  },
  {
    accessorKey: "htmlContent",
    header: "HtmlContent",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdDate",
    header: "CreatedDate",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleShow(id)}
          >
            Show
          </Button>
          {row.original.status !== 1 && (
            <Button
              variant="approve"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleActive(id)}
            >
              Active
            </Button>
          )}
          {row.original.status !== 0 && (
            <Button
              variant="destructive"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handlePassive(id)}
            >
              Passive
            </Button>
          )}{" "}
          <Button
            variant="sea"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

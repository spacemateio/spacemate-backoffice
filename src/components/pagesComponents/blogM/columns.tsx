import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { Button } from "../../ui/button.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";

export const createColumns = (
  handleShow: (id: number) => void,
  handleActive: (id: number) => void,
  handlePassive: (id: number) => void,
  handleDelete: (id: number) => void
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
      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>{truncatedText}</span>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">
              <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs">
                {row.original.title}
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    },
  },
  {
    accessorKey: "excerpt",
    header: "Excerpt",
    cell: ({ row }) => {
      const truncatedText =
        row.original.excerpt.length > 30
          ? row.original.excerpt.slice(0, 30) + "..."
          : row.original.excerpt;
      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>{truncatedText}</span>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">
              <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs">
                {row.original.excerpt}
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const truncatedText =
        row.original.image.length > 30
          ? row.original.image.slice(0, 30) + "..."
          : row.original.image;
      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>{truncatedText}</span>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">
              <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs">
                {row.original.image}
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const truncatedText =
        row.original.content.length > 30
          ? row.original.content.slice(0, 30) + "..."
          : row.original.content;
      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>{truncatedText}</span>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">
              <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs">
                {row.original.content}
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdDate",
    header: "CreatedDate",
    cell: ({ row }) => {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12 saatlik sistemi kullanmak için
      };
      return new Date(row.original.createdDate).toLocaleString(
        "en-US",
        options
      );
      return;
    },
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
          {/*{row.original.status !== 0 && (
            <Button
              variant="approve"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleActive(id)}
            >
              Active
            </Button>
          )}
          {row.original.status !== 1 && (
            <Button
              variant="destructive"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handlePassive(id)}
            >
              Passive
            </Button>
          )}{" "}*/}
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

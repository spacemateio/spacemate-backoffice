import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { Button } from "../../ui/button.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";

export const useColumns = (
  handleShow: (id: number) => void,
  handleDelete: (id: number) => void
): ColumnDef<BlogModel>[] => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`${id}`);
  };

  return [
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
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdDate",
      header: "CreatedDate",
      cell: ({ row }) => {
        const date = new Date(row.original.createdDate);
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-1">
            <Button
              variant="default"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleShow(id)}
            >
              <IconDisplay iconName="Eye" addStyle="h-4 w-4 mr-1" />
              Show
            </Button>
            <Button
              variant="sea"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleEdit(id)}
            >
              <IconDisplay iconName="Edit" addStyle="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="secondary"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleDelete(id)}
            >
              <IconDisplay iconName="Trash" addStyle="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};

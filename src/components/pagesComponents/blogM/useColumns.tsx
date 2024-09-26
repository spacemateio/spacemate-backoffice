import { ColumnDef } from "@tanstack/react-table";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { Button } from "../../ui/button.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";
import { Badge } from "../../ui/badge.tsx";

export const useColumns = (
  handleShow: (id: number) => void,
  handleDelete: (id: number) => void,
  activeOrPassive: (id: number) => void
): ColumnDef<BlogModel>[] => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`${id}`);
  };

  return [
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
      cell: ({ row }) => {
        if (row.original.status) {
          return (
            <Badge
              bgColor="rgba(186, 242, 199, 1)"
              textColor="rgba(36, 125, 55, 1)"
              text="Active"
            />
          );
        } else {
          return (
            <Badge
              bgColor="rgba(253, 205, 205, 1)"
              textColor="rgba(127, 57, 57, 1)"
              text="Passive"
            />
          );
        }
      },
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
              onClick={() => handleEdit(id)}
            >
              <IconDisplay iconName="Edit" addStyle="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => activeOrPassive(id)}
            >
              <StatusIcon status={row.original.status} />
            </Button>
            <Button
              variant="destructive"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleDelete(id)}
            >
              <IconDisplay iconName="Trash" addStyle="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};
const StatusIcon = ({ status }: { status: number }) => {
  const iconStyle =
    status === 0 ? "h-4 w-4 text-green-600" : "h-4 w-4 text-red-600";

  return <IconDisplay iconName="Check" addStyle={iconStyle} />;
};

import { Button } from "../../ui/button.tsx";
import { ColumnDef } from "@tanstack/react-table";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  ReservationModel,
  ReservationStatus,
  statusColors,
  statusText,
} from "../../../lib/features/models/ReservationM/ReservationModel.tsx";
import { Badge } from "../../ui/badge.tsx";
import { formatLocalDateTime } from "../../../lib/helpers/dateHelpers.ts";

export const createColumns = (
  handleShow: (id: number) => void,
  handleCompleteCancallation: (id: number) => void
): ColumnDef<ReservationModel>[] => [
  {
    accessorKey: "id",
    header: "Reservation Id",
  },
  {
    accessorKey: "canceledByName",
    header: "Canceled By Name",
  },
  {
    accessorKey: "cancelStatus", // Yeni bir column adı
    header: "Cancellation By",
    cell: ({ row }) => {
      const hostId = row.original.hostId;
      const canceledById = row.original.canceledById;
      const renterId = row.original.renterId;

      // Koşullara göre yazıyı döndürme
      if (hostId === canceledById) {
        return "Canceled by host";
      } else if (renterId === canceledById) {
        return "Canceled by renter";
      } else {
        return "Not canceled"; // İptal edilmemişse başka bir şey yazabilirsiniz
      }
    },
  },
  {
    accessorKey: "renterEmail",
    header: "Renter Email",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          text={statusText[status]}
          bgColor={statusColors[status].bgColor}
          textColor={statusColors[status].textColor}
          className="truncate"
        />
      );
    },
  },
  {
    accessorKey: "cancelRequestDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.original.cancelRequestDate) return "";
      const date = new Date(row.original.cancelRequestDate);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      return localDate.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        //timeZoneName: "short",
      });
    },
  },
  {
    accessorKey: "dateRange",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Range
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        );
        return localDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      };

      const startDate = formatDate(row.original.startDate);
      const endDate = formatDate(row.original.endDate);

      // 20 karakterle sınırlandırılan görüntüleme
      const truncatedText = `${startDate} - ${endDate}`.slice(0, 20);

      return (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>
                {truncatedText}
                {truncatedText.length > 20 ? "..." : ""}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content side="top" align="center">
              <div className="bg-white p-2 border border-gray-300 rounded shadow-lg max-w-xs">
                <p>Start Date: {formatLocalDateTime(row.original.startDate)}</p>
                <p>End Date: {formatLocalDateTime(row.original.endDate)}</p>
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
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
          {row.original.status === ReservationStatus.CancelRequest && (
            <Button
              className="bg-green-600"
              variant="outline"
              size="sxm"
              style={{ fontSize: "12px" }}
              onClick={() => handleCompleteCancallation(id)}
            >
              <span className="text-white">Approve Request</span>
            </Button>
          )}
        </div>
      );
    },
  },
];

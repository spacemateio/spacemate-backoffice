import { Button } from "../../ui/button.tsx";
import { ColumnDef } from "@tanstack/react-table";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";
import {
  ReservationModel,
  ReservationStatus,
} from "../../../lib/features/models/ReservationM/ReservationModel.tsx";
import { Badge } from "../../ui/badge.tsx";

export const createColumns = (
  handleShow: (id: number) => void,
  handleCompleteCancallation: (id: number) => void
): ColumnDef<ReservationModel>[] => [
  {
    accessorKey: "id",
    header: "Reservation Id",
  },
  {
    accessorKey: "hostId",
    header: "hostId",
  },
  {
    accessorKey: "canceledByName",
    header: "canceledByName",
  },
  {
    accessorKey: "canceledById",
    header: "canceledById",
  },
  {
    accessorKey: "cancelRequestDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedDate
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
    accessorKey: "renterId",
    header: "renterId",
  },
  {
    accessorKey: "renterEmail",
    header: "renterEmail",
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

      // Enum değerlerini anlaşılır bir metne dönüştür
      const statusText = {
        [ReservationStatus.Active]: "Active",
        [ReservationStatus.CancelRequest]: "Cancel Request",
        [ReservationStatus.Completed]: "Completed",
      }[status];

      // Duruma göre arka plan ve metin renklerini ayarlama
      const statusColors = {
        [ReservationStatus.Active]: {
          bgColor: "#FEF3C7",
          textColor: "#92400E",
        }, // Sarı
        [ReservationStatus.CancelRequest]: {
          bgColor: "#FECACA",
          textColor: "#B91C1C",
        }, // Kırmızı
        [ReservationStatus.Completed]: {
          bgColor: "#D1FAE5",
          textColor: "#065F46",
        }, // Yeşil
      };

      return (
        <Badge
          text={statusText}
          bgColor={statusColors[status].bgColor}
          textColor={statusColors[status].textColor}
          className="truncate"
        />
      );
    },
  },
  /*  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);
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
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <IconDisplay iconName="ArrowUpDown" addStyle="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.endDate);
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
  },*/
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
            className="bg-green-600"
            variant="outline"
            size="sxm"
            style={{ fontSize: "12px" }}
            onClick={() => handleCompleteCancallation(id)}
          >
            <span className="text-white">Approve Request</span>
          </Button>
        </div>
      );
    },
  },
];

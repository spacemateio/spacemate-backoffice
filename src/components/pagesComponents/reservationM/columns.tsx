import { ColumnDef } from "@tanstack/react-table";
import { BackOfficeReservationListItem } from "../../../lib/features/models/ReservationM/ReservationModel";
import { Badge } from "../../ui/badge";

const getStatusBadge = (status: number) => {
  const statusMap = {
    0: { label: "Pending", bgColor: "rgba(253, 230, 138, 1)", textColor: "rgba(146, 64, 14, 1)" },
    1: { label: "Active", bgColor: "rgba(186, 242, 199, 1)", textColor: "rgba(36, 125, 55, 1)" },
    2: { label: "Completed", bgColor: "rgba(219, 234, 254, 1)", textColor: "rgba(30, 64, 175, 1)" },
    3: { label: "Cancelled", bgColor: "rgba(253, 205, 205, 1)", textColor: "rgba(127, 57, 57, 1)" },
  };
  
  const statusInfo = statusMap[status as keyof typeof statusMap] || { 
    label: "Unknown", 
    bgColor: "rgba(229, 231, 235, 1)", 
    textColor: "rgba(75, 85, 99, 1)" 
  };
  
  return (
    <Badge 
      text={statusInfo.label}
      bgColor={statusInfo.bgColor}
      textColor={statusInfo.textColor}
    />
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const createColumns = (): ColumnDef<BackOfficeReservationListItem>[] => [
  {
    accessorKey: "reservationId",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("reservationId")}</div>
    ),
  },
  {
    accessorKey: "reservationStatus",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("reservationStatus")),
  },
  {
    accessorKey: "renterFullName",
    header: "Renter",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("renterFullName")}</div>
        <div className="text-sm text-muted-foreground">{row.original.renterEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: "hostFullName",
    header: "Host",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("hostFullName")}</div>
        <div className="text-sm text-muted-foreground">{row.original.hostEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: "listingDescription",
    header: "Listing",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("listingDescription")}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.getValue("startDate")),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => formatDate(row.getValue("endDate")),
  },
  {
    accessorKey: "createdDate",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdDate")),
  },
];

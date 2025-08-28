import { useCallback, useState } from "react";
import { useToast } from "../../Toast/ToastContext.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import { PaginationState } from "@tanstack/react-table";
import { BackOfficeReservationListItem } from "../../../lib/features/models/ReservationM/ReservationModel.tsx";
import { reservationApiHelper } from "../../../lib/features/apis/ReservationM/reservationApiHelper.tsx";
import { createColumns } from "./columns.tsx";

const ReservationManagementPage = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<BackOfficeReservationListItem[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  const changePagination = useCallback(async (state: PaginationState) => {
    try {
      const { maxCount, payload } = await reservationApiHelper.getAllReservationsForBackoffice(state);
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Reservations fetched successfully", "success");
    } catch (error) {
      addToast("Failed to fetch reservations", "error");
    }
  }, [addToast]);

  const columns = createColumns();

  return (
    <div className="w-full">
      <div className="py-5">
        <p>Reservation Management</p>
      </div>
      <div className="py-1">
        <div className="relative">
          <DataTable
            columns={columns}
            data={tableData}
            filterPlaceholderName="Filter reservations..."
            filterHeaderName="renterEmail"
            changePagination={changePagination}
            handleDelete={() => {}}
            maxCount={maxCount}
            listType=""
            textFilter={true}
            countName="Reservation"
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationManagementPage;

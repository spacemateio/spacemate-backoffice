import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";
import CustomModal from "../../customModals/CustomModal.tsx";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";
import { reservationApiHelper } from "../../../lib/features/apis/Reservation/reservationApiHelper.ts";
import ReservationForm from "./ReservationForm.tsx";
import {
  ReservationModel,
  ReservationStatus,
} from "../../../lib/features/models/ReservationM/ReservationModel.tsx";

const ReservationCancellation = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<ReservationModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<ReservationModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [isCancelltaionDialogOpen, setIsCancelltaionDialogOpen] =
    useState(false);

  const changePagination = useCallback(async (state: PaginationState) => {
    try {
      const { maxCount, payload } =
        await reservationApiHelper.getAllCancelRequest(state);
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Fetched all Cancel Request entries successfully", "success");
    } catch (error) {
      addToast("Failed to fetch contact us entries", "error");
    }
  }, []);

  const handleCompleteCancellation = async () => {
    console.log(showRow);
    if (!showRow?.hostId) return;
    if (ReservationStatus.CancelRequest !== showRow.status) return;
    try {
      await reservationApiHelper.changeStatusReservation(
        "Canceled",
        showRow?.id.toString()
      );
      window.location.reload(); // Sayfayı yeniden yükler
      addToast("Cancellation request deleted successfully", "success");
    } catch (error) {
      addToast("Failed to delete cancellation request", "error");
    }
  };

  const handleShow = (id: number) => {
    setIsShow(true);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleCompleteCancallation = (id: number) => {
    setShowRow(tableData.find((item) => item.id === id));
    setIsCancelltaionDialogOpen(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(handleShow, handleCompleteCancallation);

  return (
    <div className="w-full">
      <div className="py-5">
        <p>Reservation Cancellation</p>
      </div>
      <div className="py-1">
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={changePagination}
          handleDelete={() => {}}
          maxCount={maxCount}
          listType=""
          textFilter={true}
          countName="Cancellation Request"
        />
      </div>
      <ConfirmDialog
        isOpen={isCancelltaionDialogOpen}
        onClose={() => setIsCancelltaionDialogOpen(false)}
        onConfirm={handleCompleteCancellation}
        title="Complete Cancellation"
        message="did you complete cancellation?"
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
        title="Cancellation Request Detail"
      >
        <ReservationForm isShow={isShow} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default ReservationCancellation;

import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { contactUsApiHelper } from "../../../lib/features/apis/ContactUs/contactUsApiHelper.tsx";
import { ContactUsModel } from "../../../lib/features/models/ContactUs/ContactUsModel.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";
import ContactUsForm from "./contactUsForm";
import CustomModal from "../../customModals/CustomModal.tsx";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";

const ContactUsPage = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<ContactUsModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<ContactUsModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const changePagination = useCallback(async (state: PaginationState) => {
    try {
      const { maxCount, payload } =
        await contactUsApiHelper.getAllContactus(state);
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Fetched all contact entries successfully", "success");
    } catch (error) {
      addToast("Failed to fetch contact us entries", "error");
    }
  }, []);

  const handleDelete = useCallback(async (selectedRows: number[]) => {
    setSelectedRowIds(selectedRows);
    setIsDialogOpen(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedRowIds.length > 0) {
      addToast("Processing your delete request...", "info");
      try {
        await contactUsApiHelper.deleteContactus(selectedRowIds);
        setTableData(
          tableData.filter((entry) => !selectedRowIds.includes(entry.id))
        );
        setIsDialogOpen(false);
        addToast("Contact us entry deleted successfully", "success");
      } catch (error) {
        addToast("Failed to delete contact us entry", "error");
      }
    }
  };

  const handleShow = (id: number) => {
    setIsShow(true);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(handleShow);

  return (
    <div className="w-full">
      <div className="py-5">
        <p>Contact Us</p>
      </div>
      <div className="py-1">
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={changePagination}
          handleDelete={handleDelete}
          maxCount={maxCount}
          listType=""
          allowHandleDelete={true}
          textFilter={true}
        />
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this contact us entry?"
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
        title="Listing Detail"
      >
        <ContactUsForm isShow={isShow} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default ContactUsPage;

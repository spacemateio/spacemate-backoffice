import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { contactUsApiHelper } from "../../../lib/features/apis/ContactUs/contactUsApiHelper.tsx";
import { ContactUsModel } from "../../../lib/features/models/ContactUs/ContactUsModel.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import ContactUsForm from "./contactUsForm";
import CustomModal from "../../customModals/CustomModal.tsx";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";

const ContactUsPage = () => {
  const [tableData, setTableData] = useState<ContactUsModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<ContactUsModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const changePagination = useCallback(async (state: PaginationState) => {
    const { maxCount, payload } =
      await contactUsApiHelper.getAllContactus(state);
    setMaxCount(maxCount);
    setTableData(payload);
  }, []);

  const handleDelete = useCallback(async (selectedRows: any[]) => {
    setSelectedRows(selectedRows);
    setIsDialogOpen(true);
  }, []);

  const handleConfirmDelete = async () => {
    await contactUsApiHelper.getDeleteContactus(selectedRows);
    setIsDialogOpen(false);
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
        />
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
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

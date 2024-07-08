import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import ContactUsForm from "./contactUsForm";
import { ContactUsModel } from "../../../lib/features/models/ContactUs/ContactUsModel.tsx";
import { contactUsApi } from "../../../lib/features/apis/ContactUs/contactApi.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import CustomModal from "../../customModals/CustomModal.tsx";

const ContactUsPage = () => {
  const [tableData, setTableData] = useState<ContactUsModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<ContactUsModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);

  const changePagination = useCallback(async (state: PaginationState) => {
    const data: ContactUsModel[] = await contactUsApi.getAllContactus(state);

    setMaxCount(data.length);
    setTableData(data);
  }, []);

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
          maxCount={maxCount}
          listType=""
        />
      </div>
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

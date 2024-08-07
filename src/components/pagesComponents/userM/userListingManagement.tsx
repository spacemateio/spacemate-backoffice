import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./listingColumns";
import ListingManagementForm from "../listingM/listingManagementForm";
import { AdModel } from "../../../lib/features/models/AdM/AdModel.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import CustomModal from "../../customModals/CustomModal.tsx";
import { adApiHelper } from "../../../lib/features/apis/AdM/adApiHelper.tsx";

interface Props {
  userId: number;
}
const UserListingManagement = ({ userId }: Props) => {
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<AdModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [listType] = useState<string>("pending");

  const changePagination = useCallback(async (state: PaginationState) => {
    const { maxCount, payload } = await adApiHelper.getListingByUser(
      state,
      userId
    );
    setMaxCount(maxCount);
    setTableData(payload);
  }, []);

  const handleShow = (id: number) => {
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleRowDoubleClick = (listing: AdModel) => {
    setShowRow(tableData.find((item) => item.id === listing.id));
    handleOpenModal();
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(handleShow);

  return (
    <div className="w-full">
      <div className="py-1">
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={changePagination}
          handleDelete={() => {}}
          maxCount={maxCount}
          onRowDoubleClick={handleRowDoubleClick}
          listType={listType}
        />
      </div>
      <CustomModal
        title=""
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
      >
        <ListingManagementForm isShow={true} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default UserListingManagement;

"use client";

import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./listingColumns";
import { DataTable } from "@/components/customTable/data-table";
import { adApi } from "../../../lib/features/apis/AdM/adApi";
import CustomModal from "@/components/customModals/CustomModal";
import AdManagementForm from "../adM/adManagementForm";
import { AdModel } from "@/lib/features/apis/AdM/types/AdModel";

interface Props {
  userId: number;
}
const UserListingManagement = ({ userId }: Props) => {
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<AdModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);

  const changePagination = useCallback(async (state: PaginationState) => {
    const { maxCount, payload } = await adApi.getListingByUser(state, userId);
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
          maxCount={maxCount}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
      >
        <AdManagementForm isShow={true} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default UserListingManagement;

"use client";

import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { DataTable } from "@/components/customTable/data-table";
import { adApi } from "../../../lib/features/apis/AdM/adApi";
import CustomModal from "@/components/customModals/CustomModal";
import AdManagementForm from "./adManagementForm";
import { AdModel } from "@/lib/features/apis/AdM/types/AdModel";
import ListTypeComponent from "./listTypeComponent";

const AdManagementPage = () => {
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<AdModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [listType, setListType] = useState<string>("pending");

  const changePagination = useCallback(async (state: PaginationState) => {
    const { maxCount, payload } = await adApi.getNewAd(state, listType);
    setMaxCount(maxCount);
    setTableData(payload);
  }, []);

  const handleShow = (id: number) => {
    setIsShow(true);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleApprove = async (id: number) => {
    const response = await adApi.approveAd(id);
  };

  const handleReject = async (id: number) => {
    const response = await adApi.rejectAd(id);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(
    handleShow,
    handleApprove,
    handleReject,
    listType
  );

  return (
    <div className="w-full">
      <div className="py-5">
        <p>List Management</p>
      </div>
      <ListTypeComponent listType={listType} setListType={setListType} />
      <div className="py-1">
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={changePagination}
          maxCount={maxCount}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
        title="Listing Detail"
      >
        <AdManagementForm isShow={isShow} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default AdManagementPage;

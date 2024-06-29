"use client";

import { useCallback, useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { DataTable } from "@/components/customTable/data-table";
import { adApi } from "../../../lib/features/apis/AdM/adApi";
import CustomModal from "@/components/customModals/CustomModal";
import ListingManagementForm from "./listingManagementForm";
import { AdModel } from "@/lib/features/apis/AdM/types/AdModel";
import ListTypeComponent from "./listTypeComponent";

const ListingManagementPage = () => {
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<AdModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [listType, setListType] = useState<string>("pending");

  const changePagination = useCallback(
    async (state: PaginationState, currentListType: string) => {
      const { maxCount, payload } =
        currentListType === "pending"
          ? await adApi.getNewListings(state)
          : await adApi.getListingByStatus(state, currentListType);
      setMaxCount(maxCount);
      setTableData(payload);
    },
    []
  );

  useEffect(() => {
    const state = {
      pageSize: 10,
      pageIndex: 0,
    };
    changePagination(state, listType);
  }, [listType]);

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
          listType={listType}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
        title="Listing Detail"
      >
        <ListingManagementForm isShow={isShow} initialData={showRow} />
      </CustomModal>
    </div>
  );
};
export default ListingManagementPage;

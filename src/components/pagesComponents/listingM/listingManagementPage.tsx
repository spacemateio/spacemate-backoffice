import { useCallback, useEffect, useState } from "react";
import { createColumns } from "./columns";
import { useToast } from "../../Toast/ToastContext.tsx";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "../../customTable/data-table.tsx";
import { AdModel } from "../../../lib/features/models/AdM/AdModel.tsx";
import { adApiHelper } from "../../../lib/features/apis/AdM/adApiHelper.tsx";
import CustomModal from "../../customModals/CustomModal.tsx";
import ListingManagementForm from "./listingManagementForm";
import TabComponent from "../../ui/TabComponent/TabComponent.tsx";

const ListingManagementPage = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<AdModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [listType, setListType] = useState<string>("pending");

  const changePagination = useCallback(
    async (state: PaginationState, currentListType: string) => {
      try {
        addToast("Fetching listings...", "info");
        const { maxCount, payload } =
          currentListType === "pending"
            ? await adApiHelper.getNewListings(state)
            : await adApiHelper.getListingByStatus(state, currentListType);
        setMaxCount(maxCount);
        setTableData(payload);
        addToast("Get All Listings successfully", "success");
      } catch (error) {
        addToast(`Failed to fetch ${currentListType} listing`, "error");
      }
    },
    []
  );

  useEffect(() => {
    const state = {
      pageSize: 100,
      pageIndex: 0,
    };
    changePagination(state, listType);
  }, [listType]);

  const handleShow = (id: number) => {
    setIsShow(true);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleUpdate = async (id: number) => {
    setIsShow(false);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(handleShow, handleUpdate);

  return (
    <div className="w-full">
      <div className="py-5">
        <p>Listing Management</p>
      </div>
      <div className="py-1">
        <div className="absolute z-10" style={{ marginTop: "10px" }}>
          <TabComponent listType={listType} setListType={setListType} />
        </div>
        <div className="relative">
          <DataTable
            columns={columns}
            data={tableData}
            filterPlaceholderName="Filter titles..."
            filterHeaderName="title"
            changePagination={changePagination}
            handleDelete={() => {}}
            maxCount={maxCount}
            listType={listType}
            textFilter={true}
            countName={`${listType.charAt(0).toUpperCase() + listType.slice(1)} Listing`}
          />
        </div>
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

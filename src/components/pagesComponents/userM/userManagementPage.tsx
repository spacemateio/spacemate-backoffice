import { useCallback, useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import UserManagementForm from "./userManagementForm";
import UserListingManagement from "./userListingManagement";
import { UserModel } from "../../../lib/features/models/UserM/UserModel.tsx";
import { userApi } from "../../../lib/features/apis/UserM/userApi.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import CustomModal from "../../customModals/CustomModal.tsx";
import MiddleModal from "../../customModals/MiddleModal.tsx";

const UserManagementPage = () => {
  const [tableData, setTableData] = useState<UserModel[]>([]);
  const [isListingModalOpen, setIsListingModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<UserModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [userId, setUserId] = useState<number>(1);
  const [listType] = useState<string>("pending");

  const changePagination = useCallback(
    async (state: PaginationState, listType: string, sorting: SortingState) => {
      if (sorting[0]) {
        const { maxCount, payload } = await userApi.getUsersOrderBy(
          state,
          sorting
        );
        setMaxCount(maxCount);
        setTableData(payload);
      } else {
        const { maxCount, payload } = await userApi.getUsers(state);
        setMaxCount(maxCount);
        setTableData(payload);
      }
    },
    []
  );

  const handleShow = (id: number) => {
    setIsShow(true);
    console.log("Show:", id);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleActive = (id: number) => {
    console.log("User Active:", id);
  };

  const handlePassive = (id: number) => {
    console.log("User Passive:", id);
  };

  const handleListing = (id: number) => {
    setUserId(id);
    console.log("Listing:", id);
    handleListingOpenModal();
  };

  const handleListingOpenModal = () => setIsListingModalOpen(true);
  const handleListingCloseModal = () => setIsListingModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(
    handleShow,
    handleActive,
    handlePassive,
    handleListing
  );

  return (
    <div className="w-full">
      <div className="py-5">
        <p>User Management</p>
      </div>
      <div className="py-1">
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Filter emails..."
          filterHeaderName="email"
          changePagination={changePagination}
          handleDelete={() => {}}
          maxCount={maxCount}
          listType={listType}
          textFilter={true}
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePosition={handleTogglePosition}
        isCentered={isCentered}
        title="User Detail"
      >
        <UserManagementForm isShow={isShow} initialData={showRow} />
      </CustomModal>
      <MiddleModal
        isOpen={isListingModalOpen}
        onClose={handleListingCloseModal}
        title=""
      >
        <UserListingManagement userId={userId} />
      </MiddleModal>
    </div>
  );
};
export default UserManagementPage;

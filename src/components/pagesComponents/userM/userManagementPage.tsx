import { useCallback, useEffect, useRef, useState } from "react";
import { createColumns } from "./columns";
import { useToast } from "../../Toast/ToastContext.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { UserModel } from "../../../lib/features/models/UserM/UserModel.tsx";
import { userApiHelper } from "../../../lib/features/apis/UserM/userApiHelper.tsx";
import UserManagementForm from "./userManagementForm";
import UserListingManagement from "./userListingManagement";
import CustomModal from "../../customModals/CustomModal.tsx";
import MiddleModal from "../../customModals/MiddleModal.tsx";

const UserManagementPage = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<UserModel[]>([]);
  const [isListingModalOpen, setIsListingModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<UserModel | undefined>();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [userId, setUserId] = useState<number>(1);
  const [listType] = useState<string>("pending");
  const [pagination, setPagination] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTermRef = useRef<string>(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  const changePagination = useCallback(
    async (state: PaginationState, listType: string, sorting: SortingState) => {
      if (listType) {
        console.log(listType);
      }
      setPagination(state);
      try {
        const currentSearchTerm = searchTermRef.current;
        if (currentSearchTerm !== "") {
          const { maxCount, payload } = await userApiHelper.searchUsers(
            state,
            currentSearchTerm
          );
          setMaxCount(maxCount);
          setTableData(payload);
          addToast("Fetch all users successfully", "success");
        } else if (sorting[0]) {
          const { maxCount, payload } = await userApiHelper.getUsersOrderBy(
            state,
            sorting
          );
          setMaxCount(maxCount);
          setTableData(payload);
          addToast("Fetch all users successfully", "success");
        } else {
          const { maxCount, payload } = await userApiHelper.getUsers(state);
          setMaxCount(maxCount);
          setTableData(payload);
          addToast("Fetch all users successfully", "success");
        }
      } catch (error) {
        addToast("Failed to fetch users", "error");
      }
    },
    []
  );

  const handleShow = (id: number) => {
    setIsShow(true);
    setShowRow(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleListing = (id: number) => {
    setUserId(id);
    handleListingOpenModal();
  };

  const handleSearchKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      console.log("1: ", searchTerm);
      try {
        await changePagination(pagination, listType, []);
        addToast("Search user successfully", "success");
      } catch (error) {
        addToast("Failed to search user", "error");
      }
    }
  };

  const handleListingOpenModal = () => setIsListingModalOpen(true);
  const handleListingCloseModal = () => setIsListingModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(handleShow, handleListing);

  return (
    <div className="w-full">
      <div className="py-5">
        <p>User Management</p>
      </div>
      <div className="py-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="w-1/4 absolute z-10 border p-2 rounded-lg border-gray-300 focus:outline-none"
          style={{ marginTop: "16px" }}
        />
        <div className="relative">
          <DataTable
            columns={columns}
            data={tableData}
            filterPlaceholderName="Search..."
            filterHeaderName="email"
            changePagination={changePagination}
            handleDelete={() => {}}
            maxCount={maxCount}
            listType={listType}
            textFilter={true}
            countName="User"
          />
        </div>
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
        size="lg"
      >
        <UserListingManagement userId={userId} />
      </MiddleModal>
    </div>
  );
};
export default UserManagementPage;

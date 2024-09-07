import { createColumns } from "./columns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../Toast/ToastContext.tsx";
import { DataTable } from "../../../customTable/data-table.tsx";
import { UserModel } from "../../../../lib/features/models/UserM/UserModel.tsx";
import { userApiHelper } from "../../../../lib/features/apis/UserM/userApiHelper.tsx";

const UserTableComponent = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<UserModel[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = { pageSize: 5, pageIndex: 0 };
        const { maxCount, payload } = await userApiHelper.getUsers(state);
        setMaxCount(maxCount);
        setTableData(payload);
        addToast("Fetch all users successfully", "success");
      } catch (error) {
        addToast("Failed to fetch users", "error");
      }
    };
    fetchData();
  }, []);

  const handleShow = () => {
    navigate(`/admin/userManagement`);
  };

  const columns = createColumns(handleShow);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">User List</p>
        {tableData.length != 0 && (
          <div className="text-gray-700 text-sm">
            The last 5 created user accounts
          </div>
        )}
      </div>
      {tableData.length === 0 ? (
        <div className="w-full bg-gray-100 text-gray-500 text-center py-10 rounded-lg border border-gray-200">
          <p>No listings available at the moment</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          filterPlaceholderName="Search..."
          filterHeaderName="email"
          paginationShow={false}
          changePagination={() => {}}
          handleDelete={() => {}}
          maxCount={maxCount}
          listType=""
          textFilter={false}
          countName="User"
        />
      )}
    </div>
  );
};
export default UserTableComponent;

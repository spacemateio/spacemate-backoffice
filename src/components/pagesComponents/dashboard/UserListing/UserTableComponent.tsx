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
        const state = { pageSize: 10, pageIndex: 1 };
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
      <p className="text-lg font-bold pb-1">User List</p>
      <div className="text-gray-700 font-medium"></div>
      {tableData.length === 0 ? (
        <div className="w-full bg-gray-100 text-gray-500 text-center py-10 rounded-lg border border-gray-200">
          <p>No listings available at the moment</p>
        </div>
      ) : (
        <>
          <div className="text-gray-700 font-medium py-2">
            <p>The last 10 created user accounts.</p>
          </div>
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
        </>
      )}
    </div>
  );
};
export default UserTableComponent;
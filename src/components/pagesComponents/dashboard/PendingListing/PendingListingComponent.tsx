import { createColumns } from "./columns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../Toast/ToastContext";
import { DataTable } from "../../../customTable/data-table";
import { AdModel } from "../../../../lib/features/models/AdM/AdModel";
import { adApiHelper } from "../../../../lib/features/apis/AdM/adApiHelper";

const PendingListingComponent: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        addToast("Fetching listings...", "info");
        const state = {
          pageSize: 5,
          pageIndex: 0,
        };
        const { maxCount, payload } = await adApiHelper.getNewListings(state);
        setMaxCount(maxCount);
        setTableData(payload);
        addToast("Get All Listings successfully", "success");
      } catch (error) {
        addToast("Failed to fetch pending listings", "error");
      }
    };
    fetchData();
  }, []);

  const handleShow = () => {
    navigate(`/admin/listingManagement`);
  };

  const columns = createColumns(handleShow);

  return (
    <div className="w-full">
      <p className="text-lg font-bold pb-1">Pending Listing</p>
      {tableData.length === 0 ? (
        <div className="w-full bg-gray-100 text-gray-500 text-center py-10 rounded-lg border border-gray-200">
          <p>No listings available at the moment</p>
        </div>
      ) : (
        <>
          <div className="text-gray-700 font-medium py-2">
            You have {maxCount} new listings awaiting approval.
          </div>
          <DataTable
            columns={columns}
            data={tableData}
            paginationShow={false}
            filterPlaceholderName="Filter titles..."
            filterHeaderName="title"
            changePagination={() => {}}
            handleDelete={() => {}}
            maxCount={maxCount}
            listType=""
            textFilter={false}
            countName=""
          />
        </>
      )}
    </div>
  );
};

export default PendingListingComponent;

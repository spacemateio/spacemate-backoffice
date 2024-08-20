import { useEffect, useState } from "react";
import { useToast } from "../../Toast/ToastContext";
import { AdModel } from "../../../lib/features/models/AdM/AdModel";
import { adApiHelper } from "../../../lib/features/apis/AdM/adApiHelper";
import SimpleTable from "./SimpleTable";

const PendingListingComponent: React.FC = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<AdModel[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        addToast("Fetching listings...", "info");
        const state = {
          pageSize: 10,
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

  return (
    <div className="w-full">
      <p className="text-lg font-bold pt-5 pb-1">Pending List Management</p>
      {tableData.length === 0 ? (
        <div className="w-full bg-gray-100 text-gray-500 text-center py-10 rounded-lg border border-gray-200">
          <p>No listings available at the moment</p>
        </div>
      ) : (
        <>
          <div className="text-gray-700 font-medium py-2">
            You have {maxCount} new listings awaiting approval.
          </div>
          <SimpleTable data={tableData} />
        </>
      )}
    </div>
  );
};

export default PendingListingComponent;

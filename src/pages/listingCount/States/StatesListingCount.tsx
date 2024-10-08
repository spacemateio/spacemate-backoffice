import { useCallback, useEffect, useRef, useState } from "react";
import { listingApiHelper } from "../../../lib/features/apis/ListingCount/ListingApiHelper";
import { DataTable } from "../../../components/customTable/data-table";
import { useToast } from "../../../components/Toast/ToastContext";
import { PaginationState } from "@tanstack/react-table";
import { StateCountModel } from "../../../lib/features/models/ListingCountModel";
import { createColumns } from "./columns";

const StatesListingCount = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<StateCountModel[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pagination, setPagination] = useState<any>();
  const searchTermRef = useRef<string>(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  const changePagination = useCallback(async (state: PaginationState) => {
    setPagination(state);
    try {
      const { maxCount, payload } = await listingApiHelper.getCoutries(
        searchTermRef.current,
        true,
        state
      );
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Fetched all State listing count successfully", "success");
    } catch (error) {
      addToast("Failed to fetch State listing count", "error");
    }
  }, []);

  const handleSearchKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        await changePagination(pagination);
        addToast("Search user successfully", "success");
      } catch (error) {
        addToast("Failed to search user", "error");
      }
    }
  };

  const columns = createColumns();

  return (
    <>
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
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={changePagination}
          handleDelete={() => {}}
          maxCount={maxCount}
          listType=""
          allowHandleDelete={false}
          textFilter={true}
          countName="Contact Us Entry"
        />{" "}
      </div>
    </>
  );
};

export default StatesListingCount;

"use client";
import { useCallback, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/customTable/data-table";
import { PaginationState } from "@tanstack/react-table";

const Campaigns = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [maxCount, setMaxCount] = useState<number>(1);

  const changePagination = useCallback(
    async (state: PaginationState) => {},
    []
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={tableData}
        filterPlaceholderName="Filter codes..."
        filterHeaderName="code"
        changePagination={changePagination}
        maxCount={maxCount}
      />
    </div>
  );
};

export default Campaigns;

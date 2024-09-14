import { useEffect, useState } from "react";
import { contactUsApiHelper } from "../../../../lib/features/apis/ContactUs/contactUsApiHelper";
import { ContactUsModel } from "../../../../lib/features/models/ContactUs/ContactUsModel";
import { DataTable } from "../../../customTable/data-table";
import { useToast } from "../../../Toast/ToastContext";
import { createColumns } from "./columns";
import { useNavigate } from "react-router-dom";

const ContactUsLisitng = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<ContactUsModel[]>([]);

  const [maxCount, setMaxCount] = useState<number>(1);

  const fetch = async () => {
    try {
      const { maxCount, payload } =
        await contactUsApiHelper.getAllContactusByType(
          {
            pageIndex: 0,
            pageSize: 5,
          },
          "contact"
        );
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Fetched all contact entries successfully", "success");
    } catch (error) {
      addToast("Failed to fetch contact us entries", "error");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleShow = () => {
    navigate(`/admin/contactUs`);
  };

  const columns = createColumns(handleShow);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Contact Us List</p>
        {tableData.length != 0 && (
          <div className="text-gray-700 text-sm">
            The last 5 created Contact Us
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
          filterPlaceholderName="Filter titles..."
          filterHeaderName="title"
          changePagination={() => {}}
          paginationShow={false}
          handleDelete={() => {}}
          maxCount={maxCount}
          listType=""
          allowHandleDelete={true}
          textFilter={false}
          countName="Contact Us Entry"
        />
      )}
    </div>
  );
};
export default ContactUsLisitng;

"use client";

import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { BlogModel } from "@/lib/features/models/BlogM/BlogModel";
import { blogApi } from "@/lib/features/apis/BlogM/blogApi";
import { DataTable } from "@/components/customTable/data-table";
import CustomModal from "@/components/customModals/CustomModal";
import BlogManagementPreview from "./BlogManagementPreview";
import BlogManagementAdd from "./BlogManagementAdd";

const BlogManagementPage = () => {
  const [tableData, setTableData] = useState<BlogModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<BlogModel>({
    id: 0,
    url: "",
    title: "",
    subtitle: "",
    image: "",
    imageExtId: "",
    htmlContent: "",
    status: 0,
    createdDate: "",
  });
  const [maxCount, setMaxCount] = useState<number>(1);
  const [addNewBlog, setAddNewBlog] = useState<boolean>(false);

  const changePagination = useCallback(async (state: PaginationState) => {
    const { maxCount, payload } = await blogApi.getBlogAll(state);
    setMaxCount(maxCount);
    setTableData(payload);
  }, []);

  const handleShow = (id: number) => {
    const foundRow = tableData.find((item) => item.id === id);

    if (foundRow) {
      setIsShow(true);
      setShowRow(foundRow);
      handleOpenModal();
    } else {
      setShowRow({
        id: 0,
        url: "",
        title: "",
        subtitle: "",
        image: "",
        imageExtId: "",
        htmlContent: "",
        status: 0,
        createdDate: "",
      });
    }
  };

  const handleActive = async (id: number) => {
    console.log("active api yok");
  };

  const handlePassive = async (id: number) => {
    const response = await blogApi.deactivateBlog(id);
    console.log("deactivateBlog blog:", response);
  };

  const handleDelete = async (id: number) => {
    const response = await blogApi.deleteBlog(id);
    console.log("delete blog:", response);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(
    handleShow,
    handleActive,
    handlePassive,
    handleDelete
  );

  const handleAddNewBlog = () => {
    setAddNewBlog((prevState) => !prevState);
  };

  return (
    <>
      {addNewBlog ? (
        <BlogManagementAdd setAddNewBlog={setAddNewBlog} />
      ) : (
        <div className="w-full">
          <div className="py-5">
            <p>Contact Us</p>
          </div>
          <Button className="bg-red-600" onClick={handleAddNewBlog}>
            Add New Blog
          </Button>
          <div className="py-1">
            <DataTable
              columns={columns}
              data={tableData}
              filterPlaceholderName="Filter titles..."
              filterHeaderName="title"
              changePagination={changePagination}
              maxCount={maxCount}
              listType=""
            />
          </div>
          <CustomModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onTogglePosition={handleTogglePosition}
            isCentered={isCentered}
            title="Blog Detail"
          >
            <BlogManagementPreview blogPost={showRow} />
          </CustomModal>
        </div>
      )}
    </>
  );
};

export default BlogManagementPage;

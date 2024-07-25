import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { Button } from "../../ui/button.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import { blogApiHelper } from "../../../lib/features/apis/BlogM/blogApiHelper.tsx";
import BlogManagementPreview from "./BlogManagementPreview";
import BlogManagementAdd from "./BlogManagementAdd";
import CustomModal from "../../customModals/CustomModal.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";

const BlogManagementPage = () => {
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<BlogModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCentered, setIsCentered] = useState<boolean>(true);
  const [_, setIsShow] = useState<boolean>(false);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [addNewBlog, setAddNewBlog] = useState<boolean>(false);
  const [showRow, setShowRow] = useState<BlogModel>({
    id: 0,
    url: "",
    title: "",
    subtitle: "",
    excerpt: "",
    imageUrl: "",
    image: "",
    imageAlt: "",
    imageExtId: "",
    imageAltExtId: "",
    content: "",
    status: 0,
    createdDate: "",
    metaDescription: "",
  });

  const changePagination = useCallback(async (state: PaginationState) => {
    /*const { maxCount, payload } = await blogApi.getBlogAll(state);
    setMaxCount(maxCount);
    setTableData(payload);*/
    try {
      setMaxCount(1);
      const response = await blogApiHelper.getBlogAll(state);
      setTableData(response);
      //addToast("Get all blogs successfully", "success");
    } catch (error) {
      addToast("Failed to get all blogs", "error");
    }
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
        excerpt: "",
        imageUrl: "",
        image: "",
        imageAlt: "",
        imageExtId: "",
        imageAltExtId: "",
        content: "",
        status: 0,
        createdDate: "",
        metaDescription: "",
      });
    }
  };

  const handleActive = async (id: number) => {
    try {
      await blogApiHelper.activateBlog(id);
      addToast("Blog activated successfully", "success");
    } catch (error) {
      addToast("Failed to activate blog", "error");
    }
  };

  const handlePassive = async (id: number) => {
    try {
      await blogApiHelper.deactivateBlog(id);
      addToast("Blog passived successfully", "success");
    } catch (error) {
      addToast("Failed to Passive blog", "error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await blogApiHelper.deleteBlog(id);
      setTableData(tableData.filter((blog) => blog.id !== id));
      addToast("Blog deleted successfully", "success");
    } catch (error) {
      addToast("Failed to delete blog", "error");
    }
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
            <p>Blog Management</p>
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
              handleDelete={() => {}}
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

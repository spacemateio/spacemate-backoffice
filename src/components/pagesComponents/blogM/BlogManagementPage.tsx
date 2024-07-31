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
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";

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

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    onConfirm: () => {},
    title: "",
    message: "",
  });

  const changePagination = useCallback(async (state: PaginationState) => {
    try {
      const { maxCount, payload } = await blogApiHelper.getBlogAll(state);
      setMaxCount(maxCount);
      setTableData(payload);
      addToast("Get all blogs successfully", "success");
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

  const confirmDelete = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handleDelete(id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Delete",
      message: "Are you sure you want to delete this blog?",
    });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTogglePosition = () => setIsCentered(!isCentered);
  const columns = createColumns(
    handleShow,
    handleActive,
    handlePassive,
    confirmDelete
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
          <ConfirmDialog
            isOpen={confirmDialog.isOpen}
            onClose={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
            onConfirm={confirmDialog.onConfirm}
            title={confirmDialog.title}
            message={confirmDialog.message}
          />
        </div>
      )}
    </>
  );
};

export default BlogManagementPage;

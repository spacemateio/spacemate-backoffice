import { useCallback, useState } from "react";
import { useColumns } from "./useColumns.tsx";
import { Button } from "../../ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Toast/ToastContext.tsx";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "../../customTable/data-table.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { blogApiHelper } from "../../../lib/features/apis/BlogM/blogApiHelper.tsx";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";
import MiddleModal from "../../customModals/MiddleModal.tsx";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";
import BlogManagementPreview from "./BlogManagementAdd/BlogManagementPreview.tsx";

const BlogManagementPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [tableData, setTableData] = useState<BlogModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [_, setIsShow] = useState<boolean>(false);
  const [maxCount, setMaxCount] = useState<number>(1);
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
      const { maxCount, payload } = await blogApiHelper.getBlogAll(state, {
        type: "DESC",
        name: "REGISTER_DATE",
      });
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

  const activeOrPassive = async (id: number) => {
    const item = tableData.find((item) => item.id === id);
    if (item) {
      try {
        const newItem = { ...item, status: item.status === 0 ? 1 : 0 };
        await blogApiHelper.activeOrPassiveBlog(newItem);
        setTableData((prevData) =>
          prevData.map((blog) =>
            blog.id === id
              ? { ...blog, status: blog.status === 0 ? 1 : 0 }
              : blog
          )
        );
        addToast(
          `Blog ${item.status ? "Passive" : "Active"} successfully`,
          "success"
        );
      } catch (error) {
        addToast(
          `Failed to ${item.status ? "Passive" : "Active"} blog`,
          "error"
        );
      }
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const columns = useColumns(handleShow, confirmDelete, activeOrPassive);

  const handleAddNewBlog = () => {
    navigate("add");
  };

  return (
    <div className="w-full">
      <div className="py-5">
        <p>Blog Management</p>
      </div>
      <div className="py-1">
        <div className="absolute z-10" style={{ marginTop: "16px" }}>
          <Button className="bg-red-600" onClick={handleAddNewBlog}>
            <IconDisplay iconName="Plus" addStyle="mr-1" />
            Add New Blog
          </Button>
        </div>
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
            textFilter={true}
            countName="Blog"
          />
        </div>
      </div>
      <MiddleModal isOpen={isModalOpen} onClose={handleCloseModal} size="lg">
        <BlogManagementPreview blogPost={showRow} />
      </MiddleModal>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  );
};

export default BlogManagementPage;

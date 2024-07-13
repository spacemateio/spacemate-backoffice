import { useCallback, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { createColumns } from "./columns";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { blogApi } from "../../../lib/features/apis/BlogM/blogApi.tsx";
import { Button } from "../../ui/button.tsx";
import { DataTable } from "../../customTable/data-table.tsx";
import BlogManagementPreview from "./BlogManagementPreview";
import BlogManagementAdd from "./BlogManagementAdd";
import CustomModal from "../../customModals/CustomModal.tsx";

const BlogManagementPage = () => {
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
    image: "",
    imageAlt: "",
    imageExtId: "",
    content: "",
    status: 0,
    date: "",
    metaDescription: "",
  });

  const changePagination = useCallback(async (state: PaginationState) => {
    /*const { maxCount, payload } = await blogApi.getBlogAll(state);
    setMaxCount(maxCount);
    setTableData(payload);*/
    setMaxCount(1);
    const response = await blogApi.getBlogAll(state);
    setTableData(response);
    console.log(response);
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
        image: "",
        imageAlt: "",
        imageExtId: "",
        content: "",
        status: 0,
        date: "",
        metaDescription: "",
      });
    }
  };

  const handleActive = async () => {
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

import BlogManagementPage from "../../components/pagesComponents/blogM/BlogManagementPage.tsx";
import { Route, Routes } from "react-router-dom";
import BlogManagementAdd from "../../components/pagesComponents/blogM/NewBlog/BlogManagementAdd.tsx";

const BlogManagement = () => {
  return (
    <Routes>
      <Route path="" element={<BlogManagementPage />} />
      <Route path="add" element={<BlogManagementAdd />} />
      <Route path=":blogId" element={<BlogManagementAdd />} />
    </Routes>
  );
};

export default BlogManagement;

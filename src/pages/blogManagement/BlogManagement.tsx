import BlogManagementAdd from "../../components/pagesComponents/blogM/BlogManagementAdd/BlogManagementAdd.tsx";
import BlogManagementPage from "../../components/pagesComponents/blogM/BlogManagementPage.tsx";
import { Route, Routes } from "react-router-dom";

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

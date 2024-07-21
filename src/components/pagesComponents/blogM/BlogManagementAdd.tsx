import { useState } from "react";
import BlogManagementForm from "./BlogManagementForm";
import BlogManagementPreview from "./BlogManagementPreview";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel";

const BlogManagementAdd = ({
  setAddNewBlog,
}: {
  setAddNewBlog: (state: boolean) => void;
}) => {
  const [blogPost, setBlogPost] = useState<BlogModel>({
    id: 0,
    url: "",
    title: "",
    subtitle: "",
    excerpt: "",
    image: "",
    imageAlt: "",
    imageExtId: "",
    imageAltExtId: "",
    content: "",
    status: 0,
    createdDate: "",
    metaDescription: "",
  });

  return (
    <div className="flex">
      <div className="w-2/5 p-6 border-r border-gray-200">
        <BlogManagementForm
          setBlogPost={setBlogPost}
          blogPost={blogPost}
          setAddNewBlog={setAddNewBlog}
        />
      </div>
      <div className="w-3/5 p-6">
        <BlogManagementPreview blogPost={blogPost} />
      </div>
    </div>
  );
};

export default BlogManagementAdd;

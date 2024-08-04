import { FC, useEffect, useState } from "react";
import { BlogModel } from "../../../../lib/features/models/BlogM/BlogModel";
import BlogManagementForm from "./BlogManagementForm.tsx";
import BlogManagementPreview from "./BlogManagementPreview.tsx";
import { useBlogIdParam } from "./hooks/useBlogIdParam.ts";
import { blogApiHelper } from "../../../../lib/features/apis/BlogM/blogApiHelper.tsx";

const BlogManagementAdd: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [blogPost, setBlogPost] = useState<BlogModel>({
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
  const [isLoading, setIsLoading] = useState(false);

  const blogIdParam = useBlogIdParam();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);

        const response = await blogApiHelper.getBlogById(blogIdParam);
        setBlogPost(response);
      } catch (error) {
        console.log("[fetchBlogPost]", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogIdParam) {
      fetchBlogPost();
    }
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="flex">
      <div className="w-2/5 p-6 border-r border-gray-200">
        <BlogManagementForm
          setBlogPost={setBlogPost}
          blogPost={blogPost}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          mode={blogIdParam ? "edit" : "add"}
        />
      </div>
      <div className="w-3/5 p-6">
        <BlogManagementPreview blogPost={blogPost} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default BlogManagementAdd;

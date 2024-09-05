import { FC, useEffect, useState } from "react";
import { useBlogIdParam } from "./hooks/useBlogIdParam.ts";
import { BlogModel } from "../../../../lib/features/models/BlogM/BlogModel";
import { blogApiHelper } from "../../../../lib/features/apis/BlogM/blogApiHelper.tsx";
import BlogManagementForm from "./BlogManagementForm.tsx";

const BlogManagementAdd: FC = () => {
  const blogIdParam = useBlogIdParam();
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
    <BlogManagementForm
      setBlogPost={setBlogPost}
      blogPost={blogPost}
      setImageUrl={setImageUrl}
      imageUrl={imageUrl}
      mode={blogIdParam ? "edit" : "add"}
    />
  );
};

export default BlogManagementAdd;

"use client";
import { useState } from "react";
import BlogManagementForm from "./BlogManagementForm";
import BlogManagementPreview from "./BlogManagementPreview";

type BlogPost = {
  url: string;
  title: string;
  tags: string[];
  categories: string[];
  image: any;
  content: string;
  excerpt: string;
  date: string;
};

const BlogManagementPage = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    url: "",
    title: "",
    tags: [],
    categories: [],
    image: "",
    content: "",
    excerpt: "",
    date: "",
  });

  return (
    <div className="flex">
      <div className="w-2/5 p-6 border-r border-gray-200">
        Add New Blog
        <BlogManagementForm setBlogPost={setBlogPost} blogPost={blogPost} />
        asd
      </div>
      <div className="w-3/5 p-6">
        Preview
        <BlogManagementPreview blogPost={blogPost} />
      </div>
    </div>
  );
};

export default BlogManagementPage;

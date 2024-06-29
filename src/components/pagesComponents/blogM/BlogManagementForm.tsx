"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

const BlogManagementForm = ({
  blogPost,
  setBlogPost,
}: {
  blogPost: BlogPost;
  setBlogPost: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState<string>("");

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageName(e.target.files[0].name);
      setBlogPost((prev: any) => ({
        ...prev,
        ["image"]: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleImageRemove = () => {
    setImageName("");
    setBlogPost((prev: any) => ({
      ...prev,
      ["image"]: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("e:", e);
    console.log("blogPost", blogPost);
  };

  const changeBlogPost = (e: any) => {
    const { name, value } = e.target;
    setBlogPost((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-4">
        <div>
          <Label className="block text-lg font-medium mb-2">URL</Label>
          <Input
            type="text"
            name="url"
            value={blogPost.url}
            onChange={changeBlogPost}
            placeholder="URL..."
            className="w-full"
          />
        </div>
        <div>
          <Label className="block text-lg font-medium mb-2">Title</Label>
          <Input
            type="text"
            name="title"
            value={blogPost.title}
            onChange={changeBlogPost}
            placeholder="Title 1"
            className="w-full"
          />
        </div>
        <div>
          <Label className="block text-lg font-medium mb-2">Excerpt</Label>
          <Input
            type="text"
            name="excerpt"
            value={blogPost.excerpt}
            onChange={changeBlogPost}
            placeholder="Title 2"
            className="w-full"
          />
        </div>
        <div>
          <Label className="block text-lg font-medium mb-2">
            First Image Upload
          </Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            ref={fileInputRef}
          />
          {imageName && (
            <div className="flex items-center justify-between mt-2">
              <div>
                <Button
                  onClick={handleImageRemove}
                  className="mr-2 bg-red-500 rounded-xl"
                >
                  -
                </Button>
                <span>{imageName}</span>
              </div>
              <Image
                src={blogPost.image}
                alt="Selected Image"
                width={75}
                height={75}
                className="mt-4"
              />
            </div>
          )}
        </div>
        <div>
          <Label className="block text-lg font-medium mb-2">Content</Label>
          <ReactQuill
            value={blogPost.content}
            onChange={(value) =>
              setBlogPost((prev: any) => ({
                ...prev,
                ["content"]: value,
              }))
            }
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            className="bg-white"
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </>
  );
};

export default BlogManagementForm;

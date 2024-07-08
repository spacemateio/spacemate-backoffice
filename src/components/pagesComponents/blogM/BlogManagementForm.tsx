import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Image from "../../image/Image.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import ReactQuill from "react-quill";

const BlogManagementForm = ({
  blogPost,
  setBlogPost,
  setAddNewBlog,
}: {
  blogPost: BlogModel;
  setBlogPost: any;
  setAddNewBlog: (state: boolean) => void;
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
    console.log("blogPost: ", blogPost, " e: ", e);
  };

  const changeBlogPost = (e: any) => {
    const { name, value } = e.target;
    setBlogPost((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setAddNewBlog(false);
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
            value={blogPost.subtitle}
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
            value={blogPost.htmlContent}
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
        <div className="flex gap-5">
          <Button type="submit" className="w-full bg-green-400">
            Save
          </Button>
          <Button
            type="submit"
            className="w-full bg-red-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default BlogManagementForm;

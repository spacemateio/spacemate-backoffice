import { useRef, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useToast } from "../../Toast/ToastContext.tsx";
import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel.tsx";
import { blogApiHelper } from "../../../lib/features/apis/BlogM/blogApiHelper.tsx";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-custom.css";
import Image from "../../image/Image.tsx";
import htmlEditButton from "quill-html-edit-button";

Quill.register("modules/htmlEditButton", htmlEditButton);

const BlogManagementForm = ({
  blogPost,
  setBlogPost,
  imageUrl,
  setImageUrl,
  setAddNewBlog,
}: {
  blogPost: BlogModel;
  setBlogPost: any;
  imageUrl: string | undefined;
  setImageUrl: (url: string | undefined) => void;
  setAddNewBlog: (state: boolean) => void;
}) => {
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Yeni state ekledik

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (e.target.files?.[0] || null) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setImageUrl(undefined);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // Submit işlemine başlandığında butonu deaktive et
    setBlogPost((prev: any) => ({
      ...prev,
      ["createdDate"]: "",
      ["status"]: "",
      ["imageExtId"]: "",
    }));
    try {
      await blogApiHelper.addBlog(blogPost, image);
      await addToast("Blog added successfully", "success");
      setAddNewBlog(false);
    } catch (error) {
      addToast("Failed to add blog", "error");
    } finally {
      setIsSubmitting(false); // İşlem bitince butonu tekrar aktive et
    }
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
          {/* <Label className="block text-lg font-medium mb-2">URL</Label> */}
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
          {/* <Label className="block text-lg font-medium mb-2">Title</Label> */}
          <Input
            type="text"
            name="title"
            value={blogPost.title}
            onChange={changeBlogPost}
            placeholder="Title"
            className="w-full"
          />
        </div>
        <div>
          {/* <Label className="block text-lg font-medium mb-2">Excerpt</Label> */}
          <Input
            type="text"
            name="excerpt"
            value={blogPost.excerpt}
            onChange={changeBlogPost}
            placeholder="Excerpt"
            className="w-full"
          />
        </div>
        <div>
          {/* <Label className="block text-lg font-medium mb-2">
            First Image Upload
          </Label> */}
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
                src={imageUrl}
                alt="Selected Image"
                width={75}
                height={75}
                className="mt-4"
              />
            </div>
          )}
        </div>
        <div>
          {/* <Label className="block text-lg font-medium mb-2">Image Alt</Label> */}
          <Input
            type="text"
            name="imageAlt"
            value={blogPost.imageAlt}
            onChange={changeBlogPost}
            placeholder="Image Alt"
            className="w-full"
          />
        </div>
        <div>
          {/* <Label className="block text-lg font-medium mb-2">
            Meta Description
          </Label> */}
          <Input
            type="text"
            name="metaDescription"
            value={blogPost.metaDescription}
            onChange={changeBlogPost}
            placeholder="Meta Description"
            className="w-full"
          />
        </div>
        <div>
          {/* <Label className="block text-lg font-medium mb-2">Content</Label> */}
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
                [{ color: [] }, { background: [] }], // Renk seçenekleri eklendi
                ["link", "image"],
                ["clean"],
                ["htmlEditButton"],
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
              "color", // Renk formatı eklendi
              "background", // Arka plan renk formatı eklendi
            ]}
            className="bg-white"
          />
        </div>
        <div className="flex gap-5">
          <Button
            type="submit"
            className="w-full bg-green-400"
            disabled={isSubmitting} // Butonun deaktive edilmesi
          >
            Save
          </Button>
          <Button
            type="submit"
            className="w-full bg-red-500"
            onClick={handleCancel}
            disabled={isSubmitting} // Butonun deaktive edilmesi
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default BlogManagementForm;

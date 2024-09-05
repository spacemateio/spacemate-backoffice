import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-custom.css";
import { Input } from "../../../ui/input.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button.tsx";
import { useToast } from "../../../Toast/ToastContext.tsx";
import { BlogModel } from "../../../../lib/features/models/BlogM/BlogModel.tsx";
import { blogApiHelper } from "../../../../lib/features/apis/BlogM/blogApiHelper.tsx";
import Image from "../../../image/Image.tsx";
import ErrorDisplay from "./ErrorDisplay.tsx";
import MiddleModal from "../../../customModals/MiddleModal.tsx";
import BlogManagementPreview from "./BlogManagementPreview.tsx";
import InputWithLabel from "../../../ui/InputWithLabel/InputWithLabel.tsx";

const BlogManagementForm = ({
  blogPost,
  setBlogPost,
  imageUrl,
  setImageUrl,
  mode,
}: {
  blogPost: BlogModel;
  setBlogPost: any;
  imageUrl: string | undefined;
  setImageUrl: (url: string | undefined) => void;
  mode: "edit" | "add";
}) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const quillRef = useRef<ReactQuill | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [altText, setAltText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModelOpen] = useState<boolean>(false);
  const [errorAdd, setErrorAdd] = useState<any>("");
  const handleOpenPreviewModal = () => setIsPreviewModelOpen(true);
  const handleClosePreviewModal = () => setIsPreviewModelOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );

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
    setIsSubmitting(true);
    setBlogPost((prev: any) => ({
      ...prev,
      ["createdDate"]: "",
      ["status"]: "",
      ["imageExtId"]: "",
    }));
    try {
      if (mode === "add") {
        await blogApiHelper.addBlog(blogPost, image);
        addToast("Blog has been added successfully", "success");
        navigate("../");
      } else {
        await blogApiHelper.updateBlog(blogPost, image);
        addToast("Blog has been updated successfully", "success");
        navigate("../");
      }
    } catch (error: any) {
      setErrorAdd(error.response.data);
      console.log("ERROR--- ", error, " ---ERROR");
      addToast("Failed to add or edit blog", "error");
      handleOpenModal();
    } finally {
      setIsSubmitting(false);
      handleOpenModal();
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
    navigate("../");
  };

  useEffect(() => {
    // Check if quillRef.current is not null
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();

      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "IMG") {
          const imgElement = target as HTMLImageElement;
          const rect = target.getBoundingClientRect();
          setPopoverPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
          });
          setSelectedImage(imgElement); // Store the reference to the clicked image
          console.log(imgElement);

          setAltText(imgElement.alt); // Pre-fill the input with the current alt text
          setPopoverVisible(true);
          console.log("Image clicked!");
        } else {
          setPopoverVisible(false);
        }
      };

      quillInstance.root.addEventListener("click", handleClick);

      // Cleanup the event listener on component unmount
      return () => {
        quillInstance.root.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const handleSave = () => {
    if (selectedImage) {
      selectedImage.alt = altText; // Update the alt attribute of the selected image
      console.log("Alt text updated:", altText);
    }
    setPopoverVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 w-full">
        <div className="flex flex-row">
          <div className="w-1/3 flex flex-col gap-8 mr-10">
            <div>
              <InputWithLabel
                type="text"
                name="url"
                value={blogPost.url}
                onChange={changeBlogPost}
                label="URL..."
                className="w-full"
              />
            </div>
            <div>
              <InputWithLabel
                type="text"
                name="title"
                value={blogPost.title}
                onChange={changeBlogPost}
                label="Title"
                className="w-full"
              />
            </div>
            <div>
              <InputWithLabel
                type="text"
                name="excerpt"
                value={blogPost.excerpt}
                onChange={changeBlogPost}
                label="Excerpt"
                className="w-full"
              />
            </div>
            <div>
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
              <InputWithLabel
                type="text"
                name="imageAlt"
                value={blogPost.imageAlt}
                onChange={changeBlogPost}
                label="Image Alt"
                className="w-full"
              />
            </div>
            <div>
              <InputWithLabel
                type="text"
                name="metaDescription"
                value={blogPost.metaDescription}
                onChange={changeBlogPost}
                label="Meta Description"
                className="w-full"
              />
            </div>
            <div className="sticky bottom-0 flex gap-5 bg-white p-4">
              <Button
                type="submit"
                className="w-full bg-green-400"
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                type="submit"
                className="w-full bg-red-500"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="w-full bg-blue-500"
                onClick={handleOpenPreviewModal}
              >
                Preview
              </Button>
            </div>
          </div>
          <div className="w-2/3">
            <ReactQuill
              value={blogPost.content}
              ref={quillRef}
              onChange={(value) =>
                setBlogPost((prev: any) => ({
                  ...prev,
                  ["content"]: value,
                }))
              }
              modules={{
                toolbar: [
                  [
                    { header: "1" },
                    { header: "2" },
                    { header: "3" },
                    { font: [] },
                  ],
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
              className="bg-white "
            />
            {popoverVisible && (
              <div
                style={{
                  position: "absolute",
                  top: popoverPosition.top,
                  left: popoverPosition.left,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  padding: "10px",
                  zIndex: 1000,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Enter alt text"
                  style={{ marginRight: "10px" }}
                />
                <i
                  className="fas fa-check"
                  style={{
                    color: "green",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={handleSave}
                ></i>
                <i
                  className="fas fa-times"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => setPopoverVisible(false)}
                ></i>
              </div>
            )}
          </div>
        </div>
      </form>
      <MiddleModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreviewModal}
        size="lg"
      >
        <BlogManagementPreview blogPost={blogPost} imageUrl={imageUrl} />
      </MiddleModal>
      <MiddleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Blog Error Detail"
        size="md"
      >
        <ErrorDisplay error={errorAdd} />
      </MiddleModal>
    </>
  );
};

export default BlogManagementForm;

import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel";
import { Input } from "../../ui/input";
import Image from "../../image/Image.tsx";
import { useEffect, useState } from "react";
import { blogApiHelper } from "../../../lib/features/apis/BlogM/blogApiHelper.tsx";

const BlogManagementPreview = ({
  blogPost,
  imageUrl,
}: {
  blogPost: BlogModel;
  imageUrl?: string | undefined;
}) => {
  const [image, setImage] = useState<any>("");

  useEffect(() => {
    setImage(getImageFromService());
  }, []);

  const getImageFromService = async () => {
    await blogApiHelper.getImageByBlogId(/*blogPost.imageExtId*/);
  };

  return (
    <>
      <Input
        type="text"
        disabled
        className="w-full mb-5"
        value={`https://www.spacemate.io/blog/${blogPost?.url}`}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#1e0e62" }}>
          {blogPost?.title}
        </h1>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#586578" }}>
          {blogPost?.excerpt}
        </h3>
      </div>
      {imageUrl ? (
        <div className="flex justify-center mb-4">
          <Image src={imageUrl} alt="" width={1000} height={1000} />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <Image src={image} alt="" width={1000} height={1000} />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: blogPost?.content }}
        className="text-start"
        style={{ marginLeft: "100px", marginRight: "100px" }}
      ></div>
    </>
  );
};

export default BlogManagementPreview;

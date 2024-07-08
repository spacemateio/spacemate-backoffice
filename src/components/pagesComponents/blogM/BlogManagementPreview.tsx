import { BlogModel } from "../../../lib/features/models/BlogM/BlogModel";
import { Input } from "../../ui/input";
import Image from "../../image/Image.tsx";

const BlogManagementPreview = ({ blogPost }: { blogPost: BlogModel }) => {
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
          {blogPost?.subtitle}
        </h3>
      </div>
      {blogPost?.image && (
        <div className="flex justify-center mb-4">
          <Image
            src={blogPost?.image}
            alt="Preview Image"
            width={1000}
            height={1000}
          />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: blogPost?.htmlContent }}
        className="text-start"
        style={{ marginLeft: "100px", marginRight: "100px" }}
      ></div>
    </>
  );
};

export default BlogManagementPreview;

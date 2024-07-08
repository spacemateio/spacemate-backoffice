import { ComponentProps } from "react";

// Create a type alias for the img props
type ImgProps = ComponentProps<"img"> & {
  layout?: "fill" | "responsive";
};

const Image: React.FC<ImgProps> = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default Image;

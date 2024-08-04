import { useParams } from "react-router-dom";

export const useBlogIdParam = () => {
  const { blogId: blogIdParam } = useParams();

  return +blogIdParam!;
};

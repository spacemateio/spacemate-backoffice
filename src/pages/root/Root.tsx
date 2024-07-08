import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/features/auth/AuthContext.tsx";

const Root = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={"/admin/dashboard"} replace={true} />;
  }

  return <Navigate to={"/auth/login"} replace={true} />;
};

export default Root;

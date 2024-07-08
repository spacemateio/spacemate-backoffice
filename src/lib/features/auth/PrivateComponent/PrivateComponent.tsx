import { useAuth } from "../AuthContext.tsx";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function PrivateComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    console.log("User is not logged in");
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

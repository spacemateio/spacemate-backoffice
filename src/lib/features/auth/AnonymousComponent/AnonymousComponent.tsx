import { useAuth } from "../AuthContext.tsx";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function AnonymousComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    console.log("User is already logged in");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

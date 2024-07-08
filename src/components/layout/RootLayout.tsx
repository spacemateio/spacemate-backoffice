import { AuthProvider } from "../../lib/features/auth/AuthContext.tsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

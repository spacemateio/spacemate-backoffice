import Navbar from "../navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";
import PrivateComponent from "../../lib/features/auth/PrivateComponent/PrivateComponent.tsx";

export default function AdminLayout() {
  return (
    <PrivateComponent>
      <Navbar>
        <Outlet />
      </Navbar>
    </PrivateComponent>
  );
}

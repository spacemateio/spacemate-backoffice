import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "./components/Toast/ToastContext.tsx";
import "./index.css";
import Root from "./pages/root/Root.tsx";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import ContactUs from "./pages/contactUs/ContactUs.tsx";
import Register from "./pages/auth/register/Register.tsx";
import RootLayout from "./components/layout/RootLayout.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import ToastManager from "./components/Toast/ToastManager.tsx";
import BlogManagement from "./pages/blogManagement/BlogManagement.tsx";
import UserManagement from "./pages/userManagement/UserManagement.tsx";
import ListingManagement from "./pages/listingManagement/ListingManagement.tsx";
import AnonymousComponent from "./lib/features/auth/AnonymousComponent/AnonymousComponent.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Root />,
      },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "listingManagement",
            element: <ListingManagement />,
          },
          {
            path: "blogManagement/*",
            element: <BlogManagement />,
          },
          {
            path: "contactUs",
            element: <ContactUs />,
          },
          {
            path: "userManagement",
            element: <UserManagement />,
          },
        ],
      },

      {
        path: "/auth/login",
        element: (
          <AnonymousComponent>
            <Login />
          </AnonymousComponent>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <AnonymousComponent>
            <Register />
          </AnonymousComponent>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <RouterProvider router={router} /> <ToastManager />
  </ToastProvider>,
);

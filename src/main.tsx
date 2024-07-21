import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Root from "./pages/root/Root.tsx";
import RootLayout from "./components/layout/RootLayout.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import AnonymousComponent from "./lib/features/auth/AnonymousComponent/AnonymousComponent.tsx";
import ListingManagement from "./pages/listingManagement/ListingManagement.tsx";
import BlogManagement from "./pages/blogManagement/BlogManagement.tsx";
import Campaigns from "./pages/campaigns/Campaigns.tsx";
import ContactUs from "./pages/contactUs/ContactUs.tsx";
import ReservationTracking from "./pages/reservationTracking/ReservationTracking.tsx";
import UserManagement from "./pages/userManagement/UserManagement.tsx";
import { ToastProvider } from "./components/Toast/ToastProvider.tsx";

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
            path: "blogManagement",
            element: <BlogManagement />,
          },
          {
            path: "campaigns",
            element: <Campaigns />,
          },
          {
            path: "contactUs",
            element: <ContactUs />,
          },
          {
            path: "reservationTracking",
            element: <ReservationTracking />,
          },
          {
            path: "userManagement",
            element: <UserManagement />,
          },
          {
            path: "campaigns",
            element: <Campaigns />,
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
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />{" "}
    </ToastProvider>
  </React.StrictMode>
);

// trigger2

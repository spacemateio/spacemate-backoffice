export interface SubMenuItem {
  id: string;
  url: string;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  url: string;
  name: string;
  icon: string;
  submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    url: "/admin/dashboard",
    name: "Dashboard",
    icon: "Home",
  },
  {
    id: "2",
    url: "/admin/userManagement",
    name: "User Management",
    icon: "Users",
  },
  {
    id: "3",
    url: "/admin/listingManagement",
    name: "Listing Management",
    icon: "LineChart",
  },
  {
    id: "4",
    url: "/admin/reservationCancellation",
    name: "Reservation Cancellation",
    icon: "FileX2",
  },
  {
    id: "8",
    url: "/admin/reservationManagement",
    name: "Reservation Management",
    icon: "Calendar",
  },
  {
    id: "5",
    url: "/admin/blogManagement",
    name: "Blog Management",
    icon: "FileText",
  },
  {
    id: "6",
    url: "/admin/contactUs",
    name: "Contact Us",
    icon: "Package2",
  },
  {
    id: "7",
    url: "/admin/listingCount",
    name: "City, Town, State",
    icon: "Building",
  },
];
/*{
    id: "3",
    url: "/admin/listingM",
    name: "Listing Management",
    icon: "LineChart",
    submenu: [
      {
        id: "3",
        url: "/admin/listingManagement",
        name: "Listing Management",
        icon: "LineChart",
      },
      {
        id: "5",
        url: "/admin/reservationCancellation",
        name: "Reservation Cancellation",
        icon: "FileX2",
      },
    ],
  },*/

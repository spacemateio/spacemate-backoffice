export const menuItems = [
  {
    id: "1",
    url: "/dashboard",
    name: "Dashboard",
    icon: "Home",
  },
  {
    id: "2",
    url: "/userManagement",
    name: "User Management",
    icon: "Users",
  },
  {
    id: "3",
    url: "/campaigns",
    name: "Campaign Management",
    icon: "ShoppingCart",
  },
  { id: "4", url: "/adManagement", name: "List Management", icon: "LineChart" },
  {
    id: "5",
    url: "/reservationTracking",
    name: "Reservation Tracking",
    icon: "Package2",
  },
];

interface menuType {
  id: string;
  url: string;
  name: string;
  icon: string;
}

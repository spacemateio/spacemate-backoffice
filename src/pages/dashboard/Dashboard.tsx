import { useState, useEffect } from "react";
import { User, Home, FileText, Phone } from "lucide-react";
import { dashboardApiHelper } from "../../lib/features/apis/Dashboard/dashboradApiHelper";
import PendingListingComponent from "../../components/pagesComponents/dashboard/PendingListingComponent";
import CardGroup from "../../components/pagesComponents/dashboard/CardGroup";

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [contactUsCount, setContactUsCount] = useState<number | null>(null);
  const [pendingListingCount, setPendingListingCount] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          userCountData,
          pendingListingCountData,
          listingCountData,
          blogCountData,
          contactUsData,
        ] = await Promise.all([
          dashboardApiHelper.getUsers(),
          dashboardApiHelper.getNewListings(),
          dashboardApiHelper.getListingByStatus(),
          dashboardApiHelper.getBlogAll(),
          dashboardApiHelper.getAllContactus(),
        ]);

        setUserCount(userCountData);
        setListingCount(listingCountData);
        setPendingListingCount(pendingListingCountData);
        setBlogCount(blogCountData);
        setContactUsCount(contactUsData);
      } catch (err: unknown) {
        console.error("Failed to load data", err);
        setUserCount(null);
        setListingCount(null);
        setPendingListingCount(null);
        setBlogCount(null);
        setContactUsCount(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cardData = [
    {
      icon: User,
      title: "Total Users",
      count: userCount,
      bgColor: "bg-gray-100",
      iconColor: "bg-[#F5C6C6]",
      link: "/admin/userManagement",
      loading,
    },
    {
      icon: Home,
      title: "Total Listings",
      count: listingCount,
      bgColor: "bg-gray-100",
      iconColor: "bg-[#C6D8F5]",
      link: "/admin/listingManagement",
      loading,
    },
    {
      icon: Home,
      title: "Pending Listings",
      count: pendingListingCount,
      bgColor: "bg-gray-100",
      iconColor: "bg-[#C6F5D1]",
      link: "/admin/listingManagement",
      loading,
    },
    {
      icon: FileText,
      title: "Total Blogs",
      count: blogCount,
      bgColor: "bg-gray-100",
      iconColor: "bg-[#F5D1C6]",
      link: "/admin/blogManagement",
      loading,
    },
    {
      icon: Phone,
      title: "Contact Us",
      count: contactUsCount,
      bgColor: "bg-gray-100",
      iconColor: "bg-[#F5C6E7]",
      link: "/admin/contactUs",
      loading,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="text-5xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
        Dashboard
      </div>
      <CardGroup cardData={cardData} />
      <PendingListingComponent />
    </div>
  );
};

export default Dashboard;

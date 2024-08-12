import { useState, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";
import { User, Home, FileText, Phone } from "lucide-react";
import { dashboardApiHelper } from "../../lib/features/apis/Dashboard/dashboradApiHelper";

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [listingCount, setListingCount] = useState<number | null>(null);
  const [activeListingCount, setActiveListingCount] = useState<number | null>(
    null
  );
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [contactUsCount, setContactUsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          userCountData,
          listingCountData,
          activeListingData,
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
        setActiveListingCount(activeListingData);
        setBlogCount(blogCountData);
        setContactUsCount(contactUsData);
      } catch (err: unknown) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const CircularProgress = () => (
    <div className="relative">
      <Progress.Root className="relative w-8 h-8">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-400"></div>
        </div>
      </Progress.Root>
    </div>
  );

  const Card = ({
    icon: Icon,
    title,
    count,
    bgColor,
    iconColor,
    squareBgColor,
  }: {
    icon: React.ElementType;
    title: string;
    count: number | null;
    bgColor: string;
    iconColor: string;
    squareBgColor: string; // Add square background color prop
  }) => (
    <div
      className={`flex items-center p-3 rounded-lg shadow-md ${bgColor} w-full`}
    >
      <div
        className={`flex items-center justify-center w-14 h-14 ${squareBgColor} rounded-md`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="ml-4">
        <div className="font-bold">{title}</div>
        <div className="text-2xl font-semibold text-gray-700 ">
          {loading ? <CircularProgress /> : count !== null ? count : "N/A"}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <div className="text-2xl font-semibold mb-8">Dashboard</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
        <Card
          icon={User}
          title="Total Users"
          count={userCount}
          bgColor="bg-gray-100"
          iconColor="text-black"
          squareBgColor="bg-[#F5C6C6]" // Ecru Red
        />
        <Card
          icon={Home}
          title="Total Listings"
          count={listingCount}
          bgColor="bg-gray-100"
          iconColor="text-black"
          squareBgColor="bg-[#C6D8F5]" // Ecru Blue
        />
        <Card
          icon={Home}
          title="Active Listings"
          count={activeListingCount}
          bgColor="bg-gray-100"
          iconColor="text-black"
          squareBgColor="bg-[#C6F5D1]" // Ecru Green
        />
        <Card
          icon={FileText}
          title="Total Blogs"
          count={blogCount}
          bgColor="bg-gray-100"
          iconColor="text-black"
          squareBgColor="bg-[#F5D1C6]" // Ecru Orange
        />
        <Card
          icon={Phone}
          title="Contact Us"
          count={contactUsCount}
          bgColor="bg-gray-100"
          iconColor="text-black"
          squareBgColor="bg-[#F5C6E7]" // Ecru Pink
        />
      </div>
    </div>
  );
};

export default Dashboard;

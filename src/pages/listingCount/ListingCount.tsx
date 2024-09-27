import { useState } from "react";
import CityListingCount from "./City/CityListingCount";
import StatesListingCount from "./States/StatesListingCount";

const ListingCount = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      <div className="max-w-md mt-5">
        <div className="flex flex-row border-b border-gray-200 gap-4">
          <button
            className={`flex-1 pt-1 text-center whitespace-nowrap ${
              activeTab === "tab1"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tab1")}
          >
            City & Town
          </button>
          <button
            className={`flex-1 pt-1 text-center whitespace-nowrap ${
              activeTab === "tab2"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tab2")}
          >
            States
          </button>
        </div>
      </div>
      <div>
        {activeTab === "tab1" && <CityListingCount />}
        {activeTab === "tab2" && <StatesListingCount />}
      </div>
    </>
  );
};

export default ListingCount;

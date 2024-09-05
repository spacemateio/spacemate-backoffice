import React, { useEffect, useState } from "react";
import { useToast } from "../../../Toast/ToastContext";
import { ContactUsModel } from "../../../../lib/features/models/ContactUs/ContactUsModel";
import { contactUsApiHelper } from "../../../../lib/features/apis/ContactUs/contactUsApiHelper";
import ContactUsItem from "./ContactUsItem";

const ContactUsLisitng: React.FC = () => {
  const { addToast } = useToast();
  const [maxCount, setMaxCount] = useState<number>(1);
  const [data, setData] = useState<ContactUsModel[]>([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const { maxCount, payload } = await contactUsApiHelper.getAllContactus({
        pageSize: 100,
        pageIndex: 0,
      });
      setMaxCount(maxCount);
      setData(payload);
    } catch (error) {
      addToast("Failed to fetch contact us entries", "error");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Contact Us Listing</p>
        {maxCount != 0 && (
          <div className="text-gray-700 text-sm">
            You have {maxCount} new listings awaiting approval
          </div>
        )}
      </div>
      {maxCount === 0 ? (
        <div className="w-full bg-gray-100 text-gray-500 text-center py-10 rounded-lg border border-gray-200">
          <p>No listings available at the moment</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-2 flex flex-col gap-2 rounded-lg overflow-y-auto max-h-[207px]">
            {data.map((item: ContactUsModel, index: number) => (
              <ContactUsItem key={index} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactUsLisitng;

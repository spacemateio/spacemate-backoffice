import { useEffect, useState } from "react";
import { LabeledInput } from "../../labeledInput/LabeledInput.tsx";
import { AdModel } from "../../../lib/features/models/AdM/AdModel.tsx";
import { Button } from "../../ui/button.tsx";
import Image from "../../image/Image.tsx";
import { adApiHelper } from "../../../lib/features/apis/AdM/adApiHelper.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";

interface ListingManagementFormProps {
  isShow: boolean;
  initialData?: AdModel;
}

export default function ListingManagementForm({
  isShow,
  initialData,
}: ListingManagementFormProps) {
  const { addToast } = useToast();

  const [formData, setFormData] = useState<AdModel>({
    id: 0,
    email: "",
    title: "",
    address: "",
    city: "",
    state: "",
    country: "",
    vote: 0,
    reviewCount: 0,
    description: "",
    accessType: "",
    accessTimes: 0,
    accessTimeText: "",
    listingType: 0,
    space: "",
    locked: false,
    uid: 0,
    avatar: "",
    uname: "",
    userReviewCount: 0,
    location: "",
    features: "",
    price: 0,
    images: [],
    isFavourite: false,
    isVerified: false,
    street_name: "",
    postcode: "",
    unitNo: "",
    hostTimezone: "",
    height: 0,
    length: 0,
    width: 0,
    currency: "",
    created: "",
    status: 0,
  });

  useEffect(() => {
    if (isShow && initialData) {
      setFormData(initialData);
    }
  }, [isShow, initialData]);

  const handleApprove = async (id: number) => {
    try {
      await adApiHelper.approveAd(id);
      addToast("Listing approved successfully", "success");
    } catch (error) {
      addToast("Failed to approve listing", "error");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await adApiHelper.rejectAd(id);
      addToast("Listing rejected successfully", "success");
    } catch (error) {
      addToast("Failed to reject listing", "error");
    }
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {formData.avatar && (
          <div className="w-48 h-48 relative">
            <Image
              className="object-contain"
              src={formData.avatar}
              alt="Avatar Preview"
              layout="fill"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-4">
          <LabeledInput
            label="Id"
            name="id"
            value={formData.id}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Username"
            name="uname"
            value={formData.uname}
            onChange={() => {}}
            disabled={isShow}
          />
          <LabeledInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={() => {}}
            disabled={isShow}
          />
        </div>
      </div>
      <LabeledInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Features"
        name="features"
        value={formData.features}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Space"
        name="space"
        value={formData.space}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Price"
        name="price"
        value={formData.price}
        onChange={() => {}}
        disabled={isShow}
      />
      <div className="overflow-x-auto">
        <div className="flex space-x-4 p-4">
          {formData.images &&
            formData.images.map((item, index) => (
              <Image
                key={index}
                src={item.image}
                alt="Image Preview"
                width={200}
                height={200}
                className="object-cover rounded"
              />
            ))}
        </div>
      </div>
      <LabeledInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="City"
        name="city"
        value={formData.city}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="State"
        name="state"
        value={formData.state}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Country"
        name="country"
        value={formData.country}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Location"
        name="location"
        value={formData.location}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Review Count"
        name="reviewCount"
        value={formData.reviewCount}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="User Review Count"
        name="userReviewCount"
        value={formData.userReviewCount}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Access Type"
        name="accessType"
        value={formData.accessType}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Access Times"
        name="accessTimes"
        value={formData.accessTimes}
        onChange={() => {}}
        disabled={isShow}
      />
      <LabeledInput
        label="Access Time Text"
        name="accessTimeText"
        value={formData.accessTimeText}
        onChange={() => {}}
        disabled={isShow}
      />

      <div className="flex space-x-2 sticky bottom-0 bg-white p-4">
        {formData?.status !== 1 && (
          <Button
            type="submit"
            variant="approve"
            onChange={() => handleApprove(formData.id)}
          >
            Approve
          </Button>
        )}
        {formData?.status !== 3 && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleReject(formData.id)}
          >
            Reject
          </Button>
        )}
        <Button type="button" variant="default" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

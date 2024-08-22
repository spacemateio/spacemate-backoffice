import { useEffect, useState } from "react";
import { Button } from "../../ui/button.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";
import { LabeledInput } from "../../labeledInput/LabeledInput.tsx";
import { AdModel } from "../../../lib/features/models/AdM/AdModel.tsx";
import { adApiHelper } from "../../../lib/features/apis/AdM/adApiHelper.tsx";
import Image from "../../image/Image.tsx";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";

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
    userId: 0,
    email: "",
    title: "",
    city: "",
    state: "",
    country: "",
    vote: 0,
    description: "",
    avatar: "",
    avatar_preview: "",
    location: "",
    price: 0,
    images: [],
    isFavourite: false,
    street_name: "",
    postcode: "",
    unit_no: "",
    timezone: "",
    currency: "",
    created: "",
    status: 0,
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    onConfirm: () => {},
    title: "",
    message: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      console.log(initialData);
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

  const handleSave = async () => {
    try {
      addToast("Processing your listing update...", "info");
      await adApiHelper.updateListing(formData.id, {
        title: formData.title,
        description: formData.description,
      });
      addToast("Listing updated successfully", "success");
    } catch (error) {
      addToast("Failed to update listing", "error");
    }
  };

  const confirmReject = () => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handleReject(formData.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Reject",
      message: "Are you sure you want to reject this Listing?",
    });
  };

  const confirmApprove = () => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handleApprove(formData.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Approve",
      message: "Are you sure you want to approve this Listing?",
    });
  };

  const confirmSave = () => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handleSave();
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Save Changes",
      message:
        "Do you want to save the updates you made to the title and description?",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        {/* 1. Section */}
        <div className="bg-gray-100 rounded-lg shadow p-4">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                {formData.avatar ? (
                  <Image
                    className="object-cover w-full h-full"
                    src={formData.avatar}
                    alt=""
                    layout="fill"
                  />
                ) : null}
              </div>
              <div className="flex-1 flex flex-col gap-1 ml-4">
                <p className="text-lg">{formData.email}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-gray-700">
                    <strong>ID:</strong> {formData.id}
                  </span>
                  <span className="text-sm text-gray-700">
                    <strong>User ID:</strong> {formData.userId}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white text-black w-24 h-24 rounded-md flex flex-col items-center justify-center">
              <p className="text-sm uppercase font-semibold tracking-wide border-b border-black pb-2">
                Price
              </p>
              <div className="flex flex-row items-center justify-center">
                {formData.price > 0 && (
                  <p className="text-xs uppercase tracking-wide">
                    {formData.currency}
                  </p>
                )}
                <p className="text-2xl font-semibold mt-1">{formData.price}</p>
              </div>
            </div>
          </div>
        </div>
        {/* 2. Section */}
        <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col gap-3">
          <LabeledInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
            }}
            disabled={isShow}
          />
          <LabeledInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
            }}
            disabled={isShow}
          />
        </div>
        {/* 3. Section */}
        {formData.images.length > 0 && (
          <div className="bg-gray-100 rounded-lg shadow p-4">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 p-4">
                {formData.images.map((item, index) => (
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
          </div>
        )}
        {/* 4. Section */}
        <div className="bg-gray-100 rounded-lg shadow p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Country:
              </label>
              <span className="text-sm text-gray-700">{formData.country}</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                State:
              </label>
              <span className="text-sm text-gray-700">{formData.state}</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">City:</label>
              <span className="text-sm text-gray-700">{formData.city}</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Street Name:
              </label>
              <span className="text-sm text-gray-700">
                {formData.street_name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Location:
              </label>
              <span className="text-sm text-gray-700">{formData.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 sticky bottom-0 bg-white p-4 justify-between">
        <div>
          {!isShow && (
            <Button
              className="mr-2"
              type="button"
              variant="sea"
              onClick={confirmSave}
            >
              Save
            </Button>
          )}
        </div>
        {!isShow && (
          <div>
            {formData?.status !== 1 && (
              <Button
                className="mr-2"
                type="submit"
                variant="approve"
                onClick={() => confirmApprove()}
              >
                Approve
              </Button>
            )}
            {formData?.status !== 3 && (
              <Button
                type="button"
                variant="destructive"
                onClick={confirmReject}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  );
}

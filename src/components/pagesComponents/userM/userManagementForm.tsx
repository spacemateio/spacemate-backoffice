import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button.tsx";
import { UserModel } from "../../../lib/features/models/UserM/UserModel.tsx";
import { userApiHelper } from "../../../lib/features/apis/UserM/userApiHelper.tsx";
import { useToast } from "../../Toast/ToastContext.tsx";
import { useDeleteUser } from "./useDeleteUser.ts";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "../../ui/badge";
import { Label } from "../../ui/label.tsx";
import Image from "../../image/Image.tsx";
import IconDisplay from "../../iconComponent/IconDisplay.tsx";
import { getBadgeStyles } from "../../../lib/features/models/AccountType.ts";
import ConfirmDialog from "../../ui/ConfirmDialog.tsx";

interface UserManagementFormProps {
  isShow: boolean;
  initialData?: UserModel;
}

export default function UserManagementForm({
  isShow,
  initialData,
}: UserManagementFormProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<UserModel>({
    id: 0,
    name: "",
    lastname: "",
    fullName: "",
    password: "",
    email: "",
    mobile: "",
    mobileCode: "",
    address: "",
    town: "",
    state: "",
    postalCode: "",
    birthDay: new Date(),
    isHost: false,
    isVerified: false,
    status: 0,
    avatar: "",
    accountType: 0,
    idNumber: "",
    emergencyContact: "",
    emergencyContactMobileCode: "",
    emergencyContactMobile: "",
    updateDate: new Date(),
    createDate: new Date(),
    refCode: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    onConfirm: () => {},
    title: "",
    message: "",
  });
  useEffect(() => {
    if (isShow && initialData) {
      setFormData(initialData);
    }
  }, [isShow, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("81 UserManagementForm: ", formData);
  };

  const handleActive = (id?: number) => {
    try {
      if (id) {
        userApiHelper.enableUsers(id);
        addToast("Enabled user", "success");
      }
    } catch (error) {
      addToast("Failed to enable user", "error");
    }
  };

  const handlePassive = (id?: number) => {
    try {
      if (id) {
        userApiHelper.disableUsers(id);
        addToast("Passived user", "success");
      }
    } catch (error) {
      addToast("Failed to passive user", "error");
    }
  };

  const { handleDeleteUser } = useDeleteUser();

  const confirmReject = () => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handlePassive(formData.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Passive",
      message: "Are you sure you want to passive this user?",
    });
  };

  const confirmActive = () => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: () => {
        handleActive(formData.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      title: "Confirm Active",
      message: "Are you sure you want to active this user?",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="w-24 h-24 relative mr-4">
              {formData.avatar ? (
                <Image
                  className="object-cover rounded-full"
                  src={formData.avatar}
                  alt="Avatar Preview"
                  layout="fill"
                />
              ) : (
                <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-semibold">
                    {formData.name?.charAt(0).toUpperCase()}
                    {formData.lastname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {formData.name?.charAt(0).toUpperCase() +
                  formData.name?.slice(1).toLowerCase()}{" "}
                {formData.lastname?.charAt(0).toUpperCase() +
                  formData.lastname?.slice(1).toLowerCase()}
              </h2>
              {!formData.isHost && (
                <Badge bgColor="#C2DFE5" textColor="#243944" text="Renter" />
              )}
              {formData.isHost && (
                <div className="flex gap-1">
                  <Badge bgColor="#C2DFE5" textColor="#243944" text="Renter" />
                  <Badge
                    bgColor="rgba(233, 178, 155, 1)"
                    textColor="rgba(197, 83, 35, 1)"
                    text="Host"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 ml-auto">
            <div className="flex items-center">
              <Label className="mr-2 text-gray-700">Email Verification:</Label>
              {formData.status ? (
                <Badge
                  bgColor="rgba(186, 242, 199, 1)"
                  textColor="rgba(36, 125, 55, 1)"
                  text="Verified"
                />
              ) : (
                <Badge
                  bgColor="rgba(253, 205, 205, 1)"
                  textColor="rgba(127, 57, 57, 1)"
                  text="Unverified"
                />
              )}
            </div>
            <div className="flex items-center">
              <Label className="mr-2 text-gray-700">ID Verification:</Label>
              {formData.isVerified ? (
                <Badge
                  bgColor="rgba(186, 242, 199, 1)"
                  textColor="rgba(36, 125, 55, 1)"
                  text="Verified"
                />
              ) : (
                <Badge
                  bgColor="rgba(253, 205, 205, 1)"
                  textColor="rgba(127, 57, 57, 1)"
                  text="Unverified"
                />
              )}
            </div>
            <div className="flex items-center">
              <Label className="mr-2 text-gray-700">Account Type</Label>
              {formData.accountType && (
                <Badge
                  bgColor={getBadgeStyles(formData.accountType).bgColor}
                  textColor={getBadgeStyles(formData.accountType).textColor}
                  text={getBadgeStyles(formData.accountType).text}
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-4">
          <hr />
        </div>
        <div className="flex flex-col flex-grow gap-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="text-gray-700">Email:</Label>
              <IconDisplay
                iconName="Mail"
                addStyle="md:ml-16 mr-2 text-gray-700 h-5 w-5"
              />
              <span className="text-gray-700 text-sm">{formData.email}</span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700">Phone:</Label>
              <IconDisplay
                iconName="Phone"
                addStyle="text-gray-700 md:ml-14 mr-2 h-5 w-5"
              />
              <span className="text-gray-700 text-sm">
                {formData.mobileCode || "-"} {formData.mobile || "-"}
              </span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700">Created Date:</Label>
              <IconDisplay
                iconName="Calendar"
                addStyle="text-gray-700 md:ml-3 mr-2 h-5 w-5"
              />
              <span className="text-gray-700 text-sm">
                {new Date(formData.createDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700 text-sm">Address:</Label>
              <IconDisplay
                iconName="MapPin"
                addStyle="text-gray-700 md:ml-11 mr-2 h-5 w-5"
              />
              <span className="text-gray-700 text-sm">
                {formData.address || "-"}
              </span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700 text-sm">Town:</Label>
              <IconDisplay
                iconName="MapPin"
                addStyle="text-gray-700 md:ml-16 mr-2 h-5 w-5"
              />
              <span className="text-gray-700 text-sm">
                {formData.town || "-"}
              </span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700 text-sm">State:</Label>
              <span className="text-gray-700 text-sm md:ml-20">
                {formData.state || "-"}
              </span>
            </div>
            <div className="flex items-center">
              <Label className="text-gray-700 text-sm">Postal Code:</Label>
              <span className="text-gray-700 text-sm md:ml-12">
                {formData.postalCode || "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="py-2">
          <hr />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Emergency Contact:
            </label>
            <span className="text-sm text-gray-700">
              {formData.emergencyContact}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Emergency Contact Mobile:
            </label>
            <span className="text-sm text-gray-700">
              {formData.emergencyContactMobileCode}{" "}
              {formData.emergencyContactMobile}
            </span>
          </div>
        </div>
        <div className="py-2">
          <hr />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Referral Code:
          </label>
          <span className="text-sm text-gray-700">{formData.refCode}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <span className="text-sm text-gray-700">
            {formData.status.toString() ? "Active" : "Passive"}
          </span>
        </div>
        <div className="py-2">
          <hr />
        </div>
        <Button
          style={{
            display: "none",
          }}
          variant="destructive"
          onClick={() =>
            handleDeleteUser(initialData?.id!, initialData?.email!)
          }
          disabled={!(initialData !== undefined)}
        >
          Delete user completely <Cross2Icon className="ml-2" />
        </Button>
        <div className="flex space-x-2 sticky bottom-0 bg-white p-4 justify-between">
          <div>
            <Button type="submit" className="mr-2" disabled={isShow}>
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="approve"
              onClick={confirmActive}
              disabled={!(initialData !== undefined)}
              className="mr-2"
            >
              Active
            </Button>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={!(initialData !== undefined)}
            >
              Passive
            </Button>
          </div>
        </div>
      </form>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </>
  );
}

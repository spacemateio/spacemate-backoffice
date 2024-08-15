import React, { ChangeEvent, useEffect, useState } from "react";
import { LabeledInput } from "../../labeledInput/LabeledInput.tsx";
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

  useEffect(() => {
    if (isShow && initialData) {
      setFormData(initialData);
    }
  }, [isShow, initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "accountType" || name === "status" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("81 UserManagementForm: ", formData);
    // submit form data
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

  return (
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
            <h2 className="text-4xl font-semibold mb-2">
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
              addStyle="md:ml-16 mr-2 text-gray-700"
            />
            <span className="text-gray-700">{formData.email}</span>
          </div>
          <div className="flex items-center">
            <Label className="text-gray-700">Phone:</Label>
            <IconDisplay
              iconName="Phone"
              addStyle="text-gray-700 md:ml-14 mr-2 "
            />
            <span className="text-gray-700">
              {formData.mobileCode || ""} {formData.mobile || ""}
            </span>
          </div>
          <div className="flex items-center">
            <Label className="text-gray-700">Created Date:</Label>
            <IconDisplay
              iconName="Calendar"
              addStyle="text-gray-700 md:ml-3 mr-2 "
            />
            <span className="text-gray-700">
              {new Date(formData.createDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Label className="text-gray-700">Address:</Label>
            <IconDisplay
              iconName="MapPin"
              addStyle="text-gray-700 md:ml-11 mr-2 "
            />
            <span className="text-gray-700">{formData.address || ""}</span>
          </div>
        </div>
      </div>
      <div className="py-4">
        <hr />
      </div>
      <LabeledInput
        label="Town"
        name="town"
        placeholder="Town"
        value={formData.town || ""}
        onChange={handleChange}
        disabled={isShow}
      />
      <LabeledInput
        label="State"
        name="state"
        placeholder="State"
        value={formData.state || ""}
        onChange={handleChange}
        disabled={isShow}
      />
      <LabeledInput
        label="Postal Code"
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode || ""}
        onChange={handleChange}
        disabled={isShow}
      />

      <LabeledInput
        label="Emergency Contact"
        name="emergencyContact"
        placeholder="Emergency Contact"
        value={formData.emergencyContact || ""}
        onChange={handleChange}
        disabled={isShow}
      />
      <LabeledInput
        label="Emergency Contact Mobile Code"
        name="emergencyContactMobileCode"
        placeholder="Emergency Contact Mobile Code"
        value={formData.emergencyContactMobileCode || ""}
        onChange={handleChange}
        disabled={isShow}
      />
      <LabeledInput
        label="Emergency Contact Mobile"
        name="emergencyContactMobile"
        placeholder="Emergency Contact Mobile"
        value={formData.emergencyContactMobile || ""}
        onChange={handleChange}
        disabled={isShow}
      />
      <LabeledInput
        label="Referral Code"
        name="refCode"
        placeholder="Referral Code"
        value={formData.refCode}
        onChange={handleChange}
        disabled={isShow}
      />
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={formData.status.toString()}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={isShow}
        >
          <option value="0">Inactive</option>
          <option value="1">Active</option>
        </select>
      </div>
      <Button
        variant="destructive"
        onClick={() => handleDeleteUser(initialData?.id!, initialData?.email!)}
        disabled={!(initialData !== undefined)}
      >
        Delete user completely <Cross2Icon />
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
            onClick={() => handleActive(initialData?.id)}
            disabled={!(initialData !== undefined)}
            className="mr-2"
          >
            Active
          </Button>
          <Button
            variant="destructive"
            onClick={() => handlePassive(initialData?.id)}
            disabled={!(initialData !== undefined)}
          >
            Passive
          </Button>
        </div>
      </div>
    </form>
  );
}

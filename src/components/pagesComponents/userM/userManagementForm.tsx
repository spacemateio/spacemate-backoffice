"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { UserModel } from "@/lib/features/apis/UserM/types/UserModel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { LabeledInput } from "@/components/labeledInput/LabeledInput";

interface UserManagementFormProps {
  isShow: boolean;
  initialData?: UserModel;
}

export default function UserManagementForm({
  isShow,
  initialData,
}: UserManagementFormProps) {
  const [formData, setFormData] = useState<UserModel>({
    id: 0,
    name: "",
    lastname: "",
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

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleDateChange = (name: keyof UserModel, date: Date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("81", formData);
    // submit form data
  };

  const handleCancel = () => {
    // reset form or handle cancel action
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start">
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
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex gap-4">
            <div className="w-1/2">
              <LabeledInput
                label="Name"
                name="name"
                placeholder="Name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="Last Name"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname || ""}
                onChange={handleChange}
                disabled={isShow}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <LabeledInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleChange}
                disabled={isShow}
              />
            </div>
            <div className="w-1/2">
              <LabeledInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={isShow}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-25">
          <LabeledInput
            label="Mobile Code"
            name="mobileCode"
            placeholder="Code"
            value={formData.mobileCode || ""}
            onChange={handleChange}
            disabled={isShow}
          />
        </div>
        <div className="flex-1">
          <LabeledInput
            label="Mobile"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile || ""}
            onChange={handleChange}
            disabled={isShow}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <Textarea
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address || ""}
          onChange={handleChange}
          disabled={isShow}
          className="mt-1"
        />
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
      <div>
        <label
          htmlFor="birthDay"
          className="block text-sm font-medium text-gray-700"
        >
          Birthday
        </label>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center">
          <Checkbox
            name="isHost"
            id="isHost"
            checked={formData.isHost}
            onChange={() => handleCheckboxChange}
            disabled={isShow}
          />
          <label htmlFor="isHost" className="ml-2">
            Is Host
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox
            name="isVerified"
            id="isVerified"
            checked={formData.isVerified}
            onChange={() => handleCheckboxChange}
            disabled={isShow}
          />
          <label htmlFor="isVerified" className="ml-2">
            Is Verified
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="accountType"
          className="block text-sm font-medium text-gray-700"
        >
          Account Type
        </label>
        <select
          name="accountType"
          id="accountType"
          value={formData.accountType.toString()} // Convert to string for Select component
          onChange={handleChange} // Correctly handle change
          className="border p-2 rounded"
          disabled={isShow}
        >
          <option value="0">Standard</option>
          <option value="1">Premium</option>
        </select>
      </div>
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
          value={formData.status.toString()} // Convert to string for Select component
          onChange={handleChange} // Correctly handle change
          className="border p-2 rounded"
          disabled={isShow}
        >
          <option value="0">Inactive</option>
          <option value="1">Active</option>
        </select>
      </div>
      <LabeledInput
        label="Avatar URL"
        name="avatar"
        placeholder="Avatar URL"
        value={formData.avatar || ""}
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
      {/*<div>
        <label htmlFor="updateDate" className="block text-sm font-medium text-gray-700">Update Date</label>
        <DatePicker
          name="updateDate"
          id="updateDate"
          selected={formData.updateDate}
          onChange={(date) => handleDateChange("updateDate", date)}
          disabled={isShow}
        />
      </div>
      <div>
        <label htmlFor="createDate" className="block text-sm font-medium text-gray-700">Create Date</label>
        <DatePicker
          name="createDate"
          id="createDate"
          selected={formData.createDate}
          onChange={(date) => handleDateChange("createDate", date)}
          disabled={isShow}
        />
      </div>*/}
      <LabeledInput
        label="Referral Code"
        name="refCode"
        placeholder="Referral Code"
        value={formData.refCode}
        onChange={handleChange}
        disabled={isShow}
      />
      <div className="flex space-x-2">
        <Button type="submit" disabled={isShow}>
          Kaydet
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isShow}
        >
          İptal
        </Button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { InputPassword } from "../ui/InputPassword";
import IconDisplay from "../iconComponent/IconDisplay";
import { Button } from "../ui/button";
import { resetPasswordApiHelper } from "../../lib/features/auth/ResetPasswordApi";
import { useAuth } from "../../lib/features/auth/AuthContext";
import { useToast } from "../Toast/ToastContext";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user.userInfo) {
        await resetPasswordApiHelper.changePassword(
          user.userInfo?.id,
          newPassword
        );
      }
      addToast(`Update password successfully`, "success");
    } catch (error) {
      addToast(`Failed to update password`, "error");
    }
  };

  return (
    <form className="space-y-4 px-36 pt-8" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <InputPassword
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <InputPassword
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Re-type New Password
        </label>
        <InputPassword
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        <IconDisplay iconName="Check" addStyle="h-5 w-5 mr-1" />
        SAVE
      </Button>
    </form>
  );
};

export default ChangePassword;

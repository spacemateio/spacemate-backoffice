import React, { useState } from "react";
import { useAuth } from "../../lib/features/auth/AuthContext";
import ChangePassword from "./ChangePassword";
import CustomModal from "../customModals/CustomModal";
import IconDisplay from "../iconComponent/IconDisplay";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ProfileButton: React.FC = () => {
  const { userInfo, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initial = userInfo
    ? `${userInfo.name[0].toUpperCase()}${userInfo.lastname[0].toUpperCase()}`
    : "??";

  const handleChangePasswordClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const signOut = async () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <DropdownMenu.Root onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {initial}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {userInfo?.name} {userInfo?.lastname}
              </span>
              <span className="text-xs text-gray-500">{userInfo?.email}</span>
            </div>
            <IconDisplay iconName={isOpen ? "ChevronUp" : "ChevronDown"} />{" "}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white shadow-2xl rounded-md p-2"
            sideOffset={5}
          >
            <DropdownMenu.Item
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md flex flex-row gap-2 items-center"
              onSelect={handleChangePasswordClick}
            >
              <IconDisplay iconName="Key" />
              Change Password
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-md flex flex-row gap-2 items-center text-red-500"
              onSelect={signOut}
            >
              <IconDisplay iconName="LogOut" />
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        positionInfo={false}
        title="Change Password"
      >
        <ChangePassword />
      </CustomModal>
    </>
  );
};

export default ProfileButton;

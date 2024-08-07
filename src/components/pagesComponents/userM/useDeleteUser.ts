import { userApiHelper } from "../../../lib/features/apis/UserM/userApiHelper.tsx";

export const useDeleteUser = () => {
  const handleDeleteUser = async (userId: number, email: string) => {
    //
    const promptUserEmail = prompt(
      `Please enter your email to confirm deletion, userId: ${userId}`,
    );

    if (promptUserEmail === email) {
      await userApiHelper.hardDeleteUserByEmail(email);
    }
  };

  return { handleDeleteUser };
};

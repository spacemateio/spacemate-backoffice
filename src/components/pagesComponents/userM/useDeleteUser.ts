import { userApiHelper } from "../../../lib/features/apis/UserM/userApiHelper.tsx";

export const useDeleteUser = () => {
  const handleDeleteUser = async (userId: number, email: string) => {
    //
    const promptUserEmail = prompt(
      `Please enter your email to confirm deletion, userId: ${userId}`,
    );

    if (promptUserEmail === email) {
      try {
        await userApiHelper.hardDeleteUserByEmail(email);
        alert("User deleted successfully");

        window.location.reload();
      } catch (error: any) {
        console.log(error);
        alert(`An error occurred: ${error?.code}`);
      }
    } else {
      alert("Emails do not match");
    }
  };

  return { handleDeleteUser };
};

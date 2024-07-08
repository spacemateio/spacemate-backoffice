import axiosInstance from "../../axios/axiosInstance.tsx";
import { BackOfficeUser } from "../types.ts";

export const useHandleLogin = () => {
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const credentials = {
      email,
      password,
    };

    try {
      const jsonCredentials = JSON.stringify(credentials);
      const encodedCredentials = btoa(jsonCredentials);

      const response = await axiosInstance.get<BackOfficeUser>(
        `/login?credentials=${encodedCredentials}`,
      );

      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return {
    handleLogin,
  };
};

import axiosInstance from "../axios/axiosInstance";

export const resetPasswordApiHelper = {
  async changePassword(userId: number, newPassword: string): Promise<any> {
    try {
      const response: any = await axiosInstance.put(
        `/changePassword?userId=${userId}&newPassword=${newPassword}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

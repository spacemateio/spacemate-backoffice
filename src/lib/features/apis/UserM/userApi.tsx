import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { responseType } from "./types/ResponseType";

export const userApi = {
  async getUsers(state: PaginationState): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/users/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },

  async enableUsers(userId: number): Promise<void> {
    const response: any = await axiosInstance.get(`/enable/${userId}`);
    return response.data;
  },

  async disableUsers(userId: number): Promise<void> {
    const response: any = await axiosInstance.get(`/disable/${userId}`);
    return response.data;
  },
};

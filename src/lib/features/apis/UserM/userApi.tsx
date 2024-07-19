import { PaginationState } from "@tanstack/react-table";
import { responseType } from "../../models/UserM/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

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

  async orderBy(columnName: string, state: PaginationState): Promise<void> {
    const response: any = await axiosInstance.get(
      `/users/all/order?limit=${state.pageSize}&offset=${state.pageIndex + 1}&orderBy=${columnName}&sortBy=ASC`
    );
    return response.data;
  },
};

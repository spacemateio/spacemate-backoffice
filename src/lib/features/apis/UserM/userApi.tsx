import { PaginationState, SortingState } from "@tanstack/react-table";
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

  async getUsersOrderBy(
    state: PaginationState,
    sorting: SortingState
  ): Promise<responseType> {
    // NAME, EMAIL, REGISTER_DATE, EMAIL_VERIFICATION, ACCOUNT_TYPE, ID_VERIFIED, REF_CODE
    const response: any = await axiosInstance.get(
      `/users/all/order?limit=${state.pageSize}&offset=${state.pageIndex + 1}&orderBy=${sorting[0].id === "email" ? "EMAIL" : sorting[0].id}&sortBy=${sorting[0].desc === true ? "DESC" : "ASC"}`
    );
    return response.data;
  },
};

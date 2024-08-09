import { PaginationState, SortingState } from "@tanstack/react-table";
import { responseType } from "../../models/UserM/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

export const userApiHelper = {
  async getUsers(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/users/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async enableUsers(userId: number): Promise<void> {
    try {
      const response: any = await axiosInstance.get(`/enable/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async disableUsers(userId: number): Promise<void> {
    try {
      const response: any = await axiosInstance.get(`/disable/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUsersOrderBy(
    state: PaginationState,
    sorting: SortingState,
  ): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/users/all/order?limit=${state.pageSize}&offset=${state.pageIndex + 1}&orderBy=${sorting[0].id === "email" ? "EMAIL" : sorting[0].id}&sortBy=${sorting[0].desc === true ? "DESC" : "ASC"}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchUsers(
    state: PaginationState,
    searchText: string,
  ): Promise<responseType> {
    try {
      console.log("3:", searchText);

      const response: any = await axiosInstance.get(
        `/users/filter?filter=${searchText}&limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async hardDeleteUserByEmail(email: string): Promise<null> {
    try {
      return await axiosInstance.get(`/users/deleteUser/${email}`);
    } catch (error) {
      throw error;
    }
  },
};

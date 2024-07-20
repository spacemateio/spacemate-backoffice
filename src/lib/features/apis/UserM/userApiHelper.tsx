import { PaginationState, SortingState } from "@tanstack/react-table";
import { ToastManagerRef } from "../../../../components/Toast/ToastManager";
import { responseType } from "../../models/UserM/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

let toastManager: ToastManagerRef | null = null;

export const setToastManager = (manager: ToastManagerRef) => {
  toastManager = manager;
};

export const userApiHelper = {
  async getUsers(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/users/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch users", "error");
      }
      throw error;
    }
  },

  async enableUsers(userId: number): Promise<void> {
    try {
      const response: any = await axiosInstance.get(`/enable/${userId}`);
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to enable user", "error");
      }
      throw error;
    }
  },

  async disableUsers(userId: number): Promise<void> {
    try {
      const response: any = await axiosInstance.get(`/disable/${userId}`);
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to disable user", "error");
      }
      throw error;
    }
  },

  async getUsersOrderBy(
    state: PaginationState,
    sorting: SortingState
  ): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/users/all/order?limit=${state.pageSize}&offset=${state.pageIndex + 1}&orderBy=${sorting[0].id === "email" ? "EMAIL" : sorting[0].id}&sortBy=${sorting[0].desc === true ? "DESC" : "ASC"}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch users with sorting", "error");
      }
      throw error;
    }
  },
};

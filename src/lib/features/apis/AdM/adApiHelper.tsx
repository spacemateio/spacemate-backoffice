import { PaginationState } from "@tanstack/react-table";
import { ToastManagerRef } from "../../../../components/Toast/ToastManager";
import axiosInstance from "../../axios/axiosInstance";
import { responseType } from "../../models/AdM/ResponseType";

let toastManager: ToastManagerRef | null = null;

export const setToastManager = (manager: ToastManagerRef) => {
  toastManager = manager;
};

export const adApiHelper = {
  async getNewListings(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/listing/new?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch new listings", "error");
      }
      throw error;
    }
  },

  async getListingByUser(
    state: PaginationState,
    // @ts-ignore
    userId: number
  ): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/listing/user?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch listings by user", "error");
      }
      throw error;
    }
  },

  async getListingByStatus(
    state: PaginationState,
    status: string
  ): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/listing/all/${status === "approved" ? 1 : 0}?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch listings by status", "error");
      }
      throw error;
    }
  },

  async approveAd(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.post(`/listing/activate/${id}`);
      if (toastManager) {
        toastManager.addToast("Ad approved successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to approve ad", "error");
      }
      throw error;
    }
  },

  async rejectAd(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.post(`/listing/reject/${id}`);
      if (toastManager) {
        toastManager.addToast("Ad rejected successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to reject ad", "error");
      }
      throw error;
    }
  },

  async updateListing(id: number, data: any): Promise<any> {
    try {
      const response: any = await axiosInstance.put(
        `/listing/update/${id}`,
        data
      );
      if (toastManager) {
        toastManager.addToast("listing updated successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to update listing", "error");
      }
      throw error;
    }
  },
};

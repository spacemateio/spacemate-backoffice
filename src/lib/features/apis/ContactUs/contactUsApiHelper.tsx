import { PaginationState } from "@tanstack/react-table";
import { ToastManagerRef } from "../../../../components/Toast/ToastManager";
import { responseType } from "../../models/ContactUs/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

let toastManager: ToastManagerRef | null = null;

export const setToastManager = (manager: ToastManagerRef) => {
  toastManager = manager;
};

export const contactUsApiHelper = {
  async getAllContactus(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/contactus/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch contact us entries", "error");
      }
      throw error;
    }
  },
  async getDeleteContactus(ids: any[]): Promise<void> {
    try {
      console.log(ids);

      if (ids.length === 1) {
        const response: any = await axiosInstance.delete(
          `/contactus/${ids[0].original.id}`
        );
        return response.data;
      } else {
        let idArray: number[] = await ids.map((obj: any) => obj?.original?.id);
        const response: any = await axiosInstance.delete(
          `/contactus/multiple`,
          { data: idArray }
        );
        return response.data;
      }
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch contact us entries", "error");
      }
      throw error;
    }
  },
};

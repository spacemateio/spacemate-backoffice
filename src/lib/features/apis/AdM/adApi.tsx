import { PaginationState } from "@tanstack/react-table";
import { responseType } from "../../models/AdM/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

export const adApi = {
  async getNewListings(state: PaginationState): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/listing/new?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
    );
    return response.data;
  },

  async getListingByUser(
    state: PaginationState,
    // @ts-ignore
    userId: number,
  ): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/listing/user?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
    );
    return response.data;
  },

  async getListingByStatus(
    state: PaginationState,
    status: string,
  ): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/listing/all/${status === "approved" ? 1 : 0}?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
    );
    return response.data;
  },

  async approveAd(id: number): Promise<any> {
    const response: any = await axiosInstance.post(`/listing/activate/${id}`);
    return response.data;
  },

  async rejectAd(id: number): Promise<any> {
    const response: any = await axiosInstance.post(`/listing/reject/${id}`);
    return response.data;
  },
};

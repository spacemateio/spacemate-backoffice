import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { responseType } from "./types/ResponseType";

export const adApi = {
  async getNewAd(
    state: PaginationState,
    listType: string
  ): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/listing/new?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },

  async getListingByUser(
    state: PaginationState,
    userId: number
  ): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/listing/new?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
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

import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "../../axios/axiosInstance";
import { responseType } from "../../models/AdM/ResponseType";

export const adApiHelper = {
  async getNewListings(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/listing/new?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
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
      throw error;
    }
  },

  async getListingByStatus(
    state: PaginationState,
    status: string
  ): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/listing/all/${status === "approved" ? 1 : 3}?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async approveAd(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.post(`/listing/activate/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async rejectAd(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.post(`/listing/reject/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateListing(id: number, data: any): Promise<any> {
    try {
      const response: any = await axiosInstance.put(
        `/listing/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      throw error;
      console.log("response: ", error);
    }
  },
};

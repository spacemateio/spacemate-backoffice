import { PaginationState } from "@tanstack/react-table";
import { responseType } from "../../models/ContactUs/ResponseType";
import axiosInstance from "../../axios/axiosInstance";

export const contactUsApiHelper = {
  async getAllContactus(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/contactus/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getAllContactusByType(
    state: PaginationState,
    type: string
  ): Promise<responseType> {
    try {
      // title = notifyme or contact
      const response: any = await axiosInstance.get(
        `/contactus/all?title=${type}&limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteContactus(ids: any[]): Promise<void> {
    try {
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
      throw error;
    }
  },
};

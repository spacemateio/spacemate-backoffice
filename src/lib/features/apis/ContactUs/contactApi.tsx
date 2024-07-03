import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { responseType } from "../../models/ContactUs/ResponseType";

export const contactUsApi = {
  async getAllContactus(state: PaginationState): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/contactus/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },
};

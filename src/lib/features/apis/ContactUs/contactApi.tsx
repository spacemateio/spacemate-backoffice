import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { ContactUsModel } from "../../models/ContactUs/ContactUsModel";

export const contactUsApi = {
  async getAllContactus(state: PaginationState): Promise<ContactUsModel[]> {
    const response: any = await axiosInstance.get(
      `/contactus/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },
};

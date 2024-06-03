import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { responseType } from "./types/ResponseType";

export const userApi = {
  async getUsers(state: PaginationState): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/users/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },
};

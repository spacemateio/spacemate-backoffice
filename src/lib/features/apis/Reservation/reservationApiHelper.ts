import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "../../axios/axiosInstance";
import { responseType } from "../../models/ReservationM/ResponseType";

export const reservationApiHelper = {
  async getAllCancelRequest(
    status: number,
    state: PaginationState
  ): Promise<responseType> {
    try {
      const params = new URLSearchParams();
      params.append("limit", state.pageSize.toString());
      params.append("offset", (state.pageIndex + 1).toString());
      params.append("status", status.toString());

      const response: any = await axiosInstance.get(
        `/reservation/status?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async changeStatusReservation(
    status: string,
    reservationId: string
  ): Promise<any> {
    try {
      const params = new URLSearchParams();
      params.append("status", status.toString());
      params.append("reservationId", reservationId.toString());

      const response: any = await axiosInstance.put(
        `reservation/changeStatus?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

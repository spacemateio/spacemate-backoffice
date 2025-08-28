import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "../../axios/axiosInstance";
import { BackOfficeReservationListItem } from "../../models/ReservationM/ReservationModel";

export interface ReservationResponseType {
  payload: BackOfficeReservationListItem[];
  maxCount: number;
}

export const reservationApiHelper = {
  async getAllReservationsForBackoffice(
    state: PaginationState
  ): Promise<ReservationResponseType> {
    try {
      const response: any = await axiosInstance.get(
        `/reservation/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

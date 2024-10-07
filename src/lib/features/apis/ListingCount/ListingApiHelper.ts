import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "../../axios/axiosInstance";
import {
  cityResponseType,
  stateResponseType,
} from "../../models/ListingCountModel";

export const listingApiHelper = {
  async getCities(
    filter: string,
    isCity: boolean,
    state: PaginationState
  ): Promise<cityResponseType> {
    console.log(filter);

    try {
      const params = new URLSearchParams();
      params.append("filter", filter);
      params.append("isCity", isCity ? "true" : "false");
      params.append("limit", state.pageSize.toString());
      params.append("offset", (state.pageIndex + 1).toString());

      const response: any = await axiosInstance.get(
        `/listing/filter/search?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getCoutries(
    filter: string,
    isState: boolean,
    state: PaginationState
  ): Promise<stateResponseType> {
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);
      params.append("isState", isState.toString());
      params.append("limit", state.pageSize.toString());
      params.append("offset", (state.pageIndex + 1).toString());

      const response: any = await axiosInstance.get(
        `listing/filter/search?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

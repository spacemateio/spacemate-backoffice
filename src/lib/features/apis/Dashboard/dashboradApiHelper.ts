import axiosInstance from "../../axios/axiosInstance";

export const dashboardApiHelper = {
    async getUsers(): Promise<number> {
        try {
          const response: any = await axiosInstance.get(
            `/users/all?limit=1&offset=1`,
          );
          return response.data.maxCount;
        } catch (error) {
          throw error;
        }
    }, 
    async getNewListings(): Promise<number> { //TODO: maxCount uygun değil
        try {
        const response: any = await axiosInstance.get(
            `/listing/new?limit=1&offset=1`
        );
        return response.data.maxCount;
        } catch (error) {
        throw error;
        }
    },
    async getListingByStatus(): Promise<number> { //TODO: maxCount uygun değil
        try {
        const response: any = await axiosInstance.get(
            `/listing/all/1?limit=1&offset=1`
        );
        return response.data.maxCount;
        } catch (error) {
        throw error;
        }
    },
    async getBlogAll(): Promise<number> {
        try {
        const response: any = await axiosInstance.get(
            `/blog/all?limit=1&offset=1`,
        );
        return response.data.maxCount;
        } catch (error) {
        throw error;
        }
    }, 
    async getAllContactus(): Promise<number> {
        try {
        const response: any = await axiosInstance.get(
            `/contactus/all?limit=1&offset=1`
        );
        return response.data.maxCount;
        } catch (error) {
        throw error;
        }
    },
};

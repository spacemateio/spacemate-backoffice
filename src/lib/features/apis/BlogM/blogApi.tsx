import axiosInstance from "../../../../utils/axiosInstance";
import { PaginationState } from "@tanstack/react-table";
import { BlogModel } from "../../models/BlogM/BlogModel";
import { responseType } from "../../models/BlogM/ResponseType";

export const blogApi = {
  async updateBlog(id: number, data: BlogModel): Promise<any> {
    const response: any = await axiosInstance.put(`/blog/update/${id}`, data);
    return response.data;
  },

  async addBlog(data: BlogModel): Promise<any> {
    const response: any = await axiosInstance.post(`/blog`, data);
    return response.data;
  },

  async addImageById(id: number, Image: string): Promise<any> {
    const response: any = await axiosInstance.post(`/blog/image/${id}`, Image);
    return response.data;
  },

  async getBlogById(id: number): Promise<any> {
    const response: any = await axiosInstance.get(`/blog/${id}`);
    return response.data;
  },

  async deleteBlog(id: number): Promise<any> {
    const response: any = await axiosInstance.delete(`/blog/${id}`);
    return response.data;
  },

  async deactivateBlog(id: number): Promise<any> {
    const response: any = await axiosInstance.get(`/blog/deactivate/${id}`);
    return response.data;
  },

  async getBlogAll(state: PaginationState): Promise<responseType> {
    const response: any = await axiosInstance.get(
      `/blog/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
    );
    return response.data;
  },
};

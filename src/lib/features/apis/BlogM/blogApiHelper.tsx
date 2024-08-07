import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "../../axios/axiosInstance";
import { BlogModel } from "../../models/BlogM/BlogModel";
import { responseType } from "../../models/BlogM/ResponseType";

export const blogApiHelper = {
  async uploadThumbnailImage(image: File, blogIdParam: number): Promise<any> {
    const formData = new FormData();
    formData.append("file", image);
    await axiosInstance.post(`/blog/image/${blogIdParam}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async updateBlog(data: BlogModel, image: File | null): Promise<any> {
    try {
      const response: any = await axiosInstance.put(
        `/blog/update/${data.id}`,
        data,
      );

      if (image) {
        await blogApiHelper.uploadThumbnailImage(image, data.id);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addBlog(data: BlogModel, image?: File | null): Promise<any> {
    try {
      data.createdDate = new Date().toISOString();
      const response: any = await axiosInstance.post(`/blog`, data);
      if (response.data.id && image) {
        await blogApiHelper.uploadThumbnailImage(image, response.data.id);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getImageByBlogId(blogId?: number): Promise<string> {
    try {
      const response: any = await axiosInstance.get(`/blog/image/${blogId}`);
      return response.data.imageUrl;
    } catch (error) {
      throw error;
    }
  },

  async getBlogById(id: number): Promise<BlogModel> {
    try {
      const response: any = await axiosInstance.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteBlog(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.delete(`/blog/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deactivateBlog(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.get(`/blog/deactivate/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async activateBlog(id: number): Promise<any> {
    try {
      console.log(id);
    } catch (error) {
      throw error;
    }
  },

  async getBlogAllOLD(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/blog/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBlogAll(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/blog/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

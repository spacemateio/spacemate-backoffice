import { PaginationState } from "@tanstack/react-table";
import { ToastManagerRef } from "../../../../components/Toast/ToastManager";
import axiosInstance from "../../axios/axiosInstance";
import { BlogModel } from "../../models/BlogM/BlogModel";
import { responseType } from "../../models/BlogM/ResponseType";

let toastManager: ToastManagerRef | null = null;

export const setToastManager = (manager: ToastManagerRef) => {
  toastManager = manager;
};

export const blogApiHelper = {
  async updateBlog(id: number, data: BlogModel): Promise<any> {
    try {
      const response: any = await axiosInstance.put(`/blog/update/${id}`, data);
      if (toastManager) {
        toastManager.addToast("Blog updated successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to update blog", "error");
      }
      throw error;
    }
  },

  async addBlog(data: BlogModel): Promise<any> {
    try {
      data.createdDate = new Date().toISOString();
      const response: any = await axiosInstance.post(`/blog`, data);
      if (response.data.id && data.image) {
        const formData = new FormData();
        formData.append("image", data.image);
        await axiosInstance.post(`/blog/image/${response.data.id}`, formData);
      }
      if (toastManager) {
        toastManager.addToast("Blog added successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to add blog", "error");
      }
      throw error;
    }
  },

  async addImageById(id: number, image: string): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response: any = await axiosInstance.post(
        `/blog/image/${id}`,
        formData
      );
      if (toastManager) {
        toastManager.addToast("Image added successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to add image", "error");
      }
      throw error;
    }
  },

  async getBlogById(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch blog", "error");
      }
      throw error;
    }
  },

  async deleteBlog(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.delete(`/blog/${id}`);
      if (toastManager) {
        toastManager.addToast("Blog deleted successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to delete blog", "error");
      }
      throw error;
    }
  },

  async deactivateBlog(id: number): Promise<any> {
    try {
      const response: any = await axiosInstance.get(`/blog/deactivate/${id}`);

      if (toastManager) {
        console.log("here", toastManager);
        toastManager.addToast("Blog deactivated successfully", "success");
      }
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to deactivate blog", "error");
      }
      throw error;
    }
  },

  async activateBlog(id: number): Promise<any> {
    try {
      if (toastManager) {
        toastManager.addToast(`Failed to activate blog ${id}`, "error");
      }
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to activate blog", "error");
      }
      throw error;
    }
  },

  async getBlogAllOLD(state: PaginationState): Promise<responseType> {
    try {
      const response: any = await axiosInstance.get(
        `/blog/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch blogs", "error");
      }
      throw error;
    }
  },

  async getBlogAll(state: PaginationState): Promise<BlogModel[]> {
    try {
      const response: any = await axiosInstance.get(
        `/blog/all?limit=${state.pageSize}&offset=${state.pageIndex + 1}`
      );
      return response.data;
    } catch (error) {
      if (toastManager) {
        toastManager.addToast("Failed to fetch blogs", "error");
      }
      throw error;
    }
  },
};

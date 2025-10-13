import { axiosInstance } from "./axiosInstance";


export const adminSyncModels = async () => {
    const response = await axiosInstance.get('/admin/refresh-models');
    return response.data;
};


import { axiosInstance } from './axiosInstance';

export const customSignup = async (data: any) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
};

export const loginSignup = async (data: any) => {
    const response = await axiosInstance.get('/auth/login', data);
    return response.data;
};

export const otpSignup = () => { };

export const googleLogin = () => {
    // Google OAuth requires a redirect, not an AJAX call
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${baseURL}/api/auth/google`;
};

export const verifyUser = async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
};

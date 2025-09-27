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
    window.location.href = `/api/auth/google`;
};

export const verifyUser = async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
};

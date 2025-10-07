import { axiosInstance } from './axiosInstance';

export const customSignup = async (data: any) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
};

export const loginSignup = async (data: any) => {
    const response = await axiosInstance.post('/auth/api-login', data);
    return response.data;
};

export const logout = async () => {
    try {
        const response = await axiosInstance.get('/auth/logout')
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export const otpSignup = () => { };

export const googleLogin = () => {
    // Google OAuth requires a redirect, not an AJAX call
    if (import.meta.env.MODE === 'development') {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`;
        return;
    }
    const base = window.location.origin;
    window.location.href = `${base}/api/auth/google`;
};

export const verifyUser = async () => {
    const response = await axiosInstance.get('/auth/verify');
    return response.data;
};

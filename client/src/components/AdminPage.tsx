import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import { loginSignup, customSignup } from './api/authApi';
import type { AdminLoginFormData, AdminSignupFormData } from './types';

const AdminPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleAdminLogin = async (data: AdminLoginFormData) => {
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await loginSignup({ ...data, isAdmin: true });
            setSuccessMessage('Login successful! Redirecting to admin dashboard...');
            navigate('/admin-panel');
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Invalid admin credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdminSignup = async (data: AdminSignupFormData) => {
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // Create admin account with role
            await customSignup({
                email: data.email,
                password: data.password,
                role: 'Admin',
                adminSecret: data.adminSecret
            });
            navigate('/admin-panel');

        } catch (err: any) {
            setError(err?.response?.data?.error || 'Failed to create admin account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <AdminLogin
            onLogin={handleAdminLogin}
            onSignup={handleAdminSignup}
            isLoading={isLoading}
            error={error}
            successMessage={successMessage}
            onBackToLogin={handleBackToLogin}
        />
    );
};

export default AdminPage;

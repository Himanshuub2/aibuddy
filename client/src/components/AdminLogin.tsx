import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { adminStyles } from '../styles/admin';
import type { AdminLoginFormData, AdminSignupFormData, AdminAuthMode } from './types';

const useStyles = createUseStyles(adminStyles);

interface AdminLoginProps {
    onLogin: (data: AdminLoginFormData) => void;
    onSignup: (data: AdminSignupFormData) => void;
    isLoading?: boolean;
    error?: string;
    successMessage?: string;
    onBackToLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
    onLogin,
    onSignup,
    isLoading = false,
    error,
    successMessage,
    onBackToLogin
}) => {
    const classes = useStyles();
    const [mode, setMode] = useState<AdminAuthMode>('login');

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        reset: resetLogin
    } = useForm<AdminLoginFormData>();

    const {
        register: registerSignup,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors },
        reset: resetSignup,
        watch
    } = useForm<AdminSignupFormData>();

    const password = watch('password');

    const onLoginSubmit = (data: AdminLoginFormData) => {
        onLogin({ ...data, isAdmin: true } as any);
    };

    const onSignupSubmit = (data: AdminSignupFormData) => {
        onSignup(data);
    };

    const handleModeSwitch = (newMode: AdminAuthMode) => {
        setMode(newMode);
        resetLogin();
        resetSignup();
    };

    const AdminIcon = () => (
        <svg className={classes.adminIcon} viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9C9 10.1 9.9 11 11 11V13H7V11C5.9 11 5 10.1 5 9V7L11 4L17 7V9C17 10.1 16.1 11 15 11V13H13V11C14.1 11 15 10.1 15 9M13 15H11V17H9V19H15V17H13V15Z" />
        </svg>
    );

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.adminBadge}>
                    <AdminIcon />
                    Admin Portal
                </div>

                <div className={classes.title}>
                    {mode === 'login' ? 'Admin Login' : 'Admin Signup'}
                </div>
                <div className={classes.subtitle}>
                    {mode === 'login'
                        ? 'Access the administrative dashboard'
                        : 'Create a new admin account'
                    }
                </div>

                <div className={classes.tabContainer}>
                    <button
                        type="button"
                        className={`${classes.tab} ${mode === 'login' ? classes.tabActive : ''}`}
                        onClick={() => handleModeSwitch('login')}
                        disabled={isLoading}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`${classes.tab} ${mode === 'signup' ? classes.tabActive : ''}`}
                        onClick={() => handleModeSwitch('signup')}
                        disabled={isLoading}
                    >
                        Signup
                    </button>
                </div>

                {error && <div className={classes.globalError}>{error}</div>}
                {successMessage && <div className={classes.successMessage}>{successMessage}</div>}

                {mode === 'login' ? (
                    <form className={classes.form} onSubmit={handleLoginSubmit(onLoginSubmit)}>
                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="login-email">
                                Admin Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                className={`${classes.input} ${loginErrors.email ? classes.inputError : ''}`}
                                placeholder="Enter your admin email"
                                {...registerLogin('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {loginErrors.email && (
                                <span className={classes.errorMessage}>{loginErrors.email.message}</span>
                            )}
                        </div>

                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="login-password">
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                className={`${classes.input} ${loginErrors.password ? classes.inputError : ''}`}
                                placeholder="Enter your password"
                                {...registerLogin('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                            />
                            {loginErrors.password && (
                                <span className={classes.errorMessage}>{loginErrors.password.message}</span>
                            )}
                        </div>

                        <button type="submit" className={classes.button} disabled={isLoading}>
                            {isLoading ? (
                                <span className={classes.loading}>Signing in...</span>
                            ) : (
                                'Login as Admin'
                            )}
                        </button>
                    </form>
                ) : (
                    <form className={classes.form} onSubmit={handleSignupSubmit(onSignupSubmit)}>
                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="signup-email">
                                Admin Email
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                className={`${classes.input} ${signupErrors.email ? classes.inputError : ''}`}
                                placeholder="Enter your admin email"
                                {...registerSignup('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                            {signupErrors.email && (
                                <span className={classes.errorMessage}>{signupErrors.email.message}</span>
                            )}
                        </div>

                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="signup-password">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                className={`${classes.input} ${signupErrors.password ? classes.inputError : ''}`}
                                placeholder="Create a password"
                                {...registerSignup('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                        message: 'Password must contain uppercase, lowercase, number and special character'
                                    }
                                })}
                            />
                            {signupErrors.password && (
                                <span className={classes.errorMessage}>{signupErrors.password.message}</span>
                            )}
                        </div>

                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="signup-confirm-password">
                                Confirm Password
                            </label>
                            <input
                                id="signup-confirm-password"
                                type="password"
                                className={`${classes.input} ${signupErrors.confirmPassword ? classes.inputError : ''}`}
                                placeholder="Confirm your password"
                                {...registerSignup('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                            />
                            {signupErrors.confirmPassword && (
                                <span className={classes.errorMessage}>{signupErrors.confirmPassword.message}</span>
                            )}
                        </div>

                        <div className={classes.inputGroup}>
                            <label className={classes.label} htmlFor="signup-confirm-password">
                                Admin Secret
                            </label>
                            <input
                                id="signup-confirm-password"
                                type="password"
                                className={`${classes.input} ${signupErrors.adminSecret ? classes.inputError : ''}`}
                                placeholder="Enter your admin secret"
                                {...registerSignup('adminSecret', {
                                    required: 'Please confirm your password',

                                })}
                            />
                            {signupErrors.adminSecret && (
                                <span className={classes.errorMessage}>{signupErrors.adminSecret.message}</span>
                            )}
                        </div>

                        <button type="submit" className={classes.button} disabled={isLoading}>
                            {isLoading ? (
                                <span className={classes.loading}>Creating account...</span>
                            ) : (
                                'Create Admin Account'
                            )}
                        </button>
                    </form>
                )}

                <div className={classes.backToLogin}>
                    <span
                        className={classes.backToLoginLink}
                        onClick={onBackToLogin}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onBackToLogin();
                            }
                        }}
                    >
                        ← Back to regular login
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

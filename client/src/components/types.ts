// Authentication form types
export interface EmailSigninFormData {
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface EmailSignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface OTPFormData {
    otp: string;
}

export interface EmailOTPFormData {
    email: string;
}

// Auth flow states
export type AuthFlow = 'signin' | 'signup' | 'otp' | 'email-otp';

// Component props
export interface AuthFormProps {
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    error?: string;
}

export interface OTPFlowProps extends AuthFormProps {
    email: string;
    onResendOTP: () => void;
}

// API responses
export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export interface OTPResponse {
    success: boolean;
    message?: string;
}

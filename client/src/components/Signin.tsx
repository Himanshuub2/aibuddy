import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { signinStyles } from '../styles/signin';
import type { AuthFlow, EmailSigninFormData, EmailSignupFormData, OTPFormData, EmailOTPFormData } from './types';

// Import components
import EmailSignin from './EmailSignin';
import EmailSignup from './EmailSignup';
import EmailOTPRequest from './EmailOTPRequest';
import OTPVerification from './OTPVerification';
import GoogleSignin from './GoogleSignin';
import { customSignup, googleLogin, loginSignup } from './api/authApi';
import { useNavigate } from 'react-router-dom';

const useStyles = createUseStyles(signinStyles);

const Signin: React.FC = () => {
    const classes = useStyles();
    const [currentFlow, setCurrentFlow] = useState<AuthFlow>('signin');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [otpEmail, setOtpEmail] = useState<string>('');
    const navigate = useNavigate();
    // Mock API calls - replace with actual API endpoints
    const handleEmailSignin = async (data: EmailSigninFormData) => {
        setIsLoading(true);
        setError('');
        try {
            await loginSignup(data);
            navigate('/chat');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSignup = async (data: EmailSignupFormData) => {
        setIsLoading(true);
        setError('');
        try {
            await customSignup(data);
            navigate('/chat');
        } catch (err) {
            setError('Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailOTPRequest = async (data: EmailOTPFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with actual API call

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOtpEmail(data.email);
            setCurrentFlow('otp');
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPVerification = async (data: OTPFormData) => {
        setIsLoading(true);
        setError('');
        console.log(data);

        try {
            // TODO: Replace with actual API call

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate success
            alert('OTP verified successfully! (This is a mock response)');
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with actual API call

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Show success message temporarily
            const successDiv = document.createElement('div');
            successDiv.className = classes.successMessage;
            successDiv.textContent = 'New OTP sent to your email';
            document.querySelector(`.${classes.card}`)?.prepend(successDiv);

            setTimeout(() => successDiv.remove(), 3000);
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignin = () => {
        setIsLoading(true);
        setError('');

        // Google OAuth will redirect, so we don't await anything
        googleLogin();
    };

    const renderCurrentFlow = () => {
        switch (currentFlow) {
            case 'signin':
                return (
                    <EmailSignin
                        onSubmit={handleEmailSignin}
                        isLoading={isLoading}
                        error={error}
                        onSwitchToSignup={() => {
                            setCurrentFlow('signup');
                            setError('');
                        }}
                        onSwitchToEmailOTP={() => {
                            setCurrentFlow('email-otp');
                            setError('');
                        }}
                    />
                );

            case 'signup':
                return (
                    <EmailSignup
                        onSubmit={handleEmailSignup}
                        isLoading={isLoading}
                        error={error}
                        onSwitchToSignin={() => {
                            setCurrentFlow('signin');
                            setError('');
                        }}
                    />
                );

            case 'email-otp':
                return (
                    <EmailOTPRequest
                        onSubmit={handleEmailOTPRequest}
                        isLoading={isLoading}
                        error={error}
                        onSwitchToSignin={() => {
                            setCurrentFlow('signin');
                            setError('');
                        }}
                    />
                );

            case 'otp':
                return (
                    <OTPVerification
                        email={otpEmail}
                        onSubmit={handleOTPVerification}
                        onResendOTP={handleResendOTP}
                        isLoading={isLoading}
                        error={error}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                {renderCurrentFlow()}

                {(currentFlow === 'signin' || currentFlow === 'signup') && (
                    <>
                        <div className={classes.divider}>or</div>
                        <GoogleSignin onGoogleSignin={handleGoogleSignin} isLoading={isLoading} />
                    </>
                )}
            </div>

        </div>
    );
};

export default Signin;

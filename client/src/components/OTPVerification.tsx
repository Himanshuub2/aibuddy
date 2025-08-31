import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { signinStyles } from '../styles/signin';
import type { OTPFormData, OTPFlowProps } from './types';

const useStyles = createUseStyles(signinStyles);

const OTPVerification: React.FC<OTPFlowProps> = ({ email, onSubmit, onResendOTP, isLoading, error }) => {
    const classes = useStyles();
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<OTPFormData>();

    const otp = watch('otp');

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const onFormSubmit = (data: OTPFormData) => {
        onSubmit(data);
    };

    const handleResendOTP = () => {
        if (canResend) {
            onResendOTP();
            setResendTimer(60);
            setCanResend(false);
        }
    };

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setValue('otp', value);
    };

    return (
        <div>
            <div className={classes.title}>Enter verification code</div>
            <div className={classes.subtitle}>We sent a 6-digit code to {email}</div>

            {error && <div className={classes.globalError}>{error}</div>}

            <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
                <div className={classes.inputGroup}>
                    <label className={classes.label} htmlFor='otp'>
                        Verification Code
                    </label>
                    <input
                        id='otp'
                        type='text'
                        inputMode='numeric'
                        maxLength={6}
                        className={`${classes.input} ${classes.otpInput} ${errors.otp ? classes.inputError : ''}`}
                        placeholder='000000'
                        value={otp || ''}
                        {...register('otp', {
                            onChange: handleOTPChange,
                            required: 'Verification code is required',
                            minLength: {
                                value: 6,
                                message: 'Verification code must be 6 digits'
                            },
                            maxLength: {
                                value: 6,
                                message: 'Verification code must be 6 digits'
                            },
                            pattern: {
                                value: /^\d{6}$/,
                                message: 'Verification code must contain only numbers'
                            }
                        })}
                    />
                    {errors.otp && <span className={classes.errorMessage}>{errors.otp.message}</span>}
                </div>

                <button type='submit' className={classes.button} disabled={isLoading || !otp || otp.length !== 6}>
                    {isLoading ? <span className={classes.loading}>Verifying...</span> : 'Verify Code'}
                </button>
            </form>

            <div className={classes.switchAuth}>
                Didn't receive the code?{' '}
                {canResend ? (
                    <button type='button' className={classes.resendOTP} onClick={handleResendOTP} disabled={isLoading}>
                        Resend code
                    </button>
                ) : (
                    <span style={{ color: '#666666' }}>Resend in {resendTimer}s</span>
                )}
            </div>
        </div>
    );
};

export default OTPVerification;

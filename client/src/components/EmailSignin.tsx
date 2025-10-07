import React from 'react';
import { useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { signinStyles } from '../styles/signin';
import type { EmailSigninFormData, AuthFormProps } from './types';

const useStyles = createUseStyles(signinStyles);

interface EmailSigninProps extends AuthFormProps {
    onSwitchToSignup: () => void;
    onSwitchToEmailOTP: () => void;
}

const EmailSignin: React.FC<EmailSigninProps> = ({
    onSubmit,
    isLoading,
    error,
    onSwitchToSignup,
    onSwitchToEmailOTP
}) => {
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailSigninFormData>();

    const onFormSubmit = (data: EmailSigninFormData) => {
        onSubmit(data);
    };

    return (
        <div>
            <div className={classes.title}>Welcome back</div>
            <div className={classes.subtitle}>Sign in to your account</div>

            {error && <div className={classes.globalError}>{error}</div>}

            <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
                <div className={classes.inputGroup}>
                    <label className={classes.label} htmlFor='email'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
                        placeholder='Enter your email'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.email && <span className={classes.errorMessage}>{errors.email.message}</span>}
                </div>

                <div className={classes.inputGroup}>
                    <label className={classes.label} htmlFor='password'>
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
                        placeholder='Enter your password'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && <span className={classes.errorMessage}>{errors.password.message}</span>}
                </div>

                <div className={classes.inputGroup}>
                    <div className={classes.checkboxContainer}>
                        <input
                            id='isAdmin'
                            type='checkbox'
                            {...register('isAdmin')}
                        />
                        <label htmlFor='isAdmin' className={classes.checkboxLabel}>
                            Login as Admin
                        </label>
                    </div>
                </div>

                <button type='submit' className={classes.button} disabled={isLoading}>
                    {isLoading ? <span className={classes.loading}>Signing in...</span> : 'Sign In'}
                </button>
            </form>

            <div className={classes.divider}>or</div>

            <button
                type='button'
                className={`${classes.button} ${classes.buttonSecondary}`}
                onClick={onSwitchToEmailOTP}
                disabled={isLoading}
            >
                Sign in with Email OTP
            </button>

            <div className={classes.switchAuth}>
                Don't have an account?{' '}
                <span
                    className={classes.switchAuthLink}
                    onClick={onSwitchToSignup}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            onSwitchToSignup();
                        }
                    }}
                >
                    Sign up
                </span>
            </div>


        </div>
    );
};

export default EmailSignin;

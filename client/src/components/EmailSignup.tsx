import React from 'react';
import { useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { signinStyles } from '../styles/signin';
import type { EmailSignupFormData, AuthFormProps } from './types';

const useStyles = createUseStyles(signinStyles);

interface EmailSignupProps extends AuthFormProps {
    onSwitchToSignin: () => void;
}

const EmailSignup: React.FC<EmailSignupProps> = ({ onSubmit, isLoading, error, onSwitchToSignin }) => {
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<EmailSignupFormData>();
    const password = watch('password');

    const onFormSubmit = async (data: EmailSignupFormData) => {
        onSubmit(data);
    };

    return (
        <div>
            <div className={classes.title}>Create account</div>
            <div className={classes.subtitle}>Sign up to get started</div>

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
                        placeholder='Create a password (min 8 characters)'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                                message: 'Password must contain uppercase, lowercase, and number'
                            }
                        })}
                    />
                    {errors.password && <span className={classes.errorMessage}>{errors.password.message}</span>}
                </div>

                <div className={classes.inputGroup}>
                    <label className={classes.label} htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input
                        id='confirmPassword'
                        type='password'
                        className={`${classes.input} ${errors.confirmPassword ? classes.inputError : ''}`}
                        placeholder='Confirm your password'
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: value => value === password || 'Passwords do not match'
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className={classes.errorMessage}>{errors.confirmPassword.message}</span>
                    )}
                </div>

                <button type='submit' className={classes.button} disabled={isLoading}>
                    {isLoading ? <span className={classes.loading}>Creating account...</span> : 'Create Account'}
                </button>
            </form>

            <div className={classes.switchAuth}>
                Already have an account?{' '}
                <span
                    className={classes.switchAuthLink}
                    onClick={onSwitchToSignin}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            onSwitchToSignin();
                        }
                    }}
                >
                    Sign in
                </span>
            </div>
        </div>
    );
};

export default EmailSignup;

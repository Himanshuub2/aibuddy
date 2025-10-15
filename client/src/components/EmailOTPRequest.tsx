import React from 'react';
import { useForm } from 'react-hook-form';
import { createUseStyles } from 'react-jss';
import { signinStyles } from '../styles/signin';
import type { EmailOTPFormData, AuthFormProps } from './types';

const useStyles = createUseStyles(signinStyles);

interface EmailOTPRequestProps extends AuthFormProps {
    onSwitchToSignin: () => void;
}

const EmailOTPRequest: React.FC<EmailOTPRequestProps> = ({ onSubmit, isLoading, error, onSwitchToSignin }) => {
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EmailOTPFormData>();

    const onFormSubmit = (data: EmailOTPFormData) => {
        onSubmit(data);
    };

    return (
        <div>
            <div className={classes.title}>Sign in with OTP</div>
            <div className={classes.subtitle}>Enter your email to receive a verification code</div>

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

                <button type='submit' className={classes.button} disabled={isLoading}>
                    {isLoading ? <span className={classes.loading}>Sending OTP...</span> : 'Send OTP'}
                </button>
            </form>

            <div className={classes.switchAuth}>
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
                    ← Back to sign in
                </span>
            </div>
        </div>
    );
};

export default EmailOTPRequest;

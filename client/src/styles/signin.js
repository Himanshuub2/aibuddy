// React-JSS styles for signin/signup components  
const signinStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '48px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '8px',
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: '16px',
    color: '#666666',
    marginBottom: '32px',
    textAlign: 'center',
  },
  
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#000000',
  },
  
  input: {
    padding: '12px 16px',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    fontSize: '16px',
    color: '#000000',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      borderColor: '#000000',
    },
    '&::placeholder': {
      color: '#999999',
    },
  },
  
  inputError: {
    borderColor: '#ff4444',
  },
  
  errorMessage: {
    fontSize: '12px',
    color: '#ff4444',
    marginTop: '4px',
  },
  
  button: {
    padding: '12px 24px',
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    outline: 'none',
    '&:hover': {
      backgroundColor: '#333333',
    },
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: '#000000',
    border: '1px solid #000000',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '&:disabled': {
      color: '#cccccc',
      borderColor: '#cccccc',
      backgroundColor: 'transparent',
    },
  },
  
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8f8f8',
    },
  },
  
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    color: '#666666',
    fontSize: '14px',
    '&::before': {
      content: '""',
      flex: 1,
      height: '1px',
      backgroundColor: '#e0e0e0',
      marginRight: '16px',
    },
    '&::after': {
      content: '""',
      flex: 1,
      height: '1px',
      backgroundColor: '#e0e0e0',
      marginLeft: '16px',
    },
  },
  
  switchAuth: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '14px',
    color: '#666666',
  },
  
  switchAuthLink: {
    color: '#000000',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  
  otpInput: {
    textAlign: 'center',
    fontSize: '24px',
    letterSpacing: '8px',
    fontWeight: '600',
  },
  
  resendOTP: {
    backgroundColor: 'transparent',
    color: '#666666',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    '&:hover': {
      color: '#000000',
    },
    '&:disabled': {
      color: '#cccccc',
      cursor: 'not-allowed',
    },
  },
  
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    '&::after': {
      content: '""',
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: '$spin 1s linear infinite',
    },
  },
  
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  
  // Success/Error states
  successMessage: {
    backgroundColor: '#f0f9f0',
    color: '#2d5e2d',
    border: '1px solid #4caf4c',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  
  globalError: {
    backgroundColor: '#fdf2f2',
    color: '#7f1d1d',
    border: '1px solid #ff4444',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center',
  },
};

export { signinStyles };

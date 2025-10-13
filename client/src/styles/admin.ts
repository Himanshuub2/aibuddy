// React-JSS styles for admin login/signup components
const adminStyles: { [key: string]: any } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },

    card: {
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '48px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
    },

    adminBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '24px',
        alignSelf: 'center'
    },

    title: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#000000',
        marginBottom: '8px',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: '16px',
        color: '#666666',
        marginBottom: '32px',
        textAlign: 'center'
    },

    tabContainer: {
        display: 'flex',
        backgroundColor: '#f1f3f4',
        borderRadius: '8px',
        padding: '4px',
        marginBottom: '32px'
    },

    tab: {
        flex: 1,
        padding: '12px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: '#666666'
    },

    tabActive: {
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },

    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#000000'
    },

    input: {
        padding: '14px 16px',
        border: '2px solid #e8eaed',
        borderRadius: '8px',
        fontSize: '16px',
        color: '#000000',
        backgroundColor: '#ffffff',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        '&:focus': {
            borderColor: '#000000'
        },
        '&::placeholder': {
            color: '#999999'
        }
    },

    inputError: {
        borderColor: '#ea4335'
    },

    errorMessage: {
        fontSize: '12px',
        color: '#ea4335',
        marginTop: '4px',
        fontWeight: '500'
    },

    button: {
        padding: '14px 24px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        outline: 'none',
        '&:hover': {
            backgroundColor: '#1557b0'
        },
        '&:disabled': {
            backgroundColor: '#cccccc',
            cursor: 'not-allowed'
        }
    },

    buttonSecondary: {
        backgroundColor: 'transparent',
        color: '#000000',
        border: '2px solid #000000',
        '&:hover': {
            backgroundColor: '#f8f9fa'
        },
        '&:disabled': {
            color: '#cccccc',
            borderColor: '#cccccc',
            backgroundColor: 'transparent'
        }
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
            marginRight: '16px'
        },
        '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            backgroundColor: '#e0e0e0',
            marginLeft: '16px'
        }
    },

    backToLogin: {
        textAlign: 'center',
        marginTop: '24px',
        fontSize: '14px',
        color: '#666666'
    },

    backToLoginLink: {
        color: '#000000',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontWeight: '600',
        '&:hover': {
            textDecoration: 'none'
        }
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
            animation: '$spin 1s linear infinite'
        }
    },

    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
    },

    successMessage: {
        backgroundColor: '#e8f5e8',
        color: '#137333',
        border: '1px solid #34a853',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '14px',
        marginBottom: '16px',
        textAlign: 'center',
        fontWeight: '500'
    },

    globalError: {
        backgroundColor: '#fce8e6',
        color: '#d93025',
        border: '1px solid #ea4335',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '14px',
        marginBottom: '16px',
        textAlign: 'center',
        fontWeight: '500'
    },

    adminIcon: {
        width: '16px',
        height: '16px',
        fill: 'currentColor'
    }
};

export { adminStyles };

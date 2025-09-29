import React, { useEffect, useReducer } from 'react';
import { AuthContext } from '.';
import { verifyUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

type userType = {
    user: {
        loggedIn: boolean;
        user: any;
    }
}
const initialState: userType = {
    user: {
        loggedIn: false,
        user: null
    }
}
export const AuthReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchUser() {
            const user = await verifyUser();
            if (!user.loggedIn) {
                console.log('CAME HRERE !!')
                navigate('/');
                return;
            }
            dispatch({ type: 'SET_USER', payload: user });
        }
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

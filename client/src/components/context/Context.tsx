import React, { useReducer } from 'react';
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

export const AuthProvider = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const navigate = useNavigate();

    if (!state.user.loggedIn || !allowedRoles.includes(state.user.role)) {

        async function fetchUser() {
            try {

                const user = await verifyUser();
                if (!user.loggedIn || !allowedRoles.includes(user.role)) {
                    navigate('/');
                    alert('You are not Logged in or not authorized to access this page');
                    return;
                }
                dispatch({ type: 'SET_USER', payload: user });
            }
            catch (err) {
                console.log(err)
                navigate('/');
                return;
            }

        }
        fetchUser();
        return null;
    }
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

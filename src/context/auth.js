import React, { useReducer, createContext } from 'react';
import { LOGIN, LOGOUT } from './types';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
};

if (localStorage.getItem('pToken')) {
    const decoded = jwtDecode(localStorage.getItem('pToken'));

    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('pToken');
        window.location.href = '/';
    } else {
        initialState.user = decoded;
    }
}

const AuthContext = createContext({
    user: null,
    login: userData => { },
    logout: () => { }
});

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const history = useHistory();

    const login = userData => {
        localStorage.setItem('pToken', userData.token);
        dispatch({
            type: LOGIN,
            payload: userData
        });
    };

    const logout = () => {
        localStorage.removeItem('pToken');
        history.push('/');
        dispatch({
            type: LOGOUT
        });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };
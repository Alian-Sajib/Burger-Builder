import * as actionTypes from '../redux/actionTypes';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const authLoading = (isLoading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}

export const authFailed = (errMsg) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}

const saveTokenDataAndGetUserId = access => {
    const token = jwtDecode(access)
    console.log(token)
    localStorage.setItem('token', access);
    localStorage.setItem('userId', token.user_id);
    const expirationTime = new Date(token.exp * 1000) //multiply 1000 casuse get time () in ms and expiresIn is 3600sec
    localStorage.setItem('expirationTime', expirationTime);
    return token.user_id;
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        // returnSecureToken: true
    }
    let authUrl = null;
    if (mode === 'Login') {
        // authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        authUrl = 'http://127.0.0.1:8000/api/token/'
    } else {
        // authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        authUrl = 'http://127.0.0.1:8000/api/users/'
    }
    // const API_KEY = '' //hide the API key
    axios.post(authUrl, authData)
        .then(response => {
            dispatch(authLoading(false));
            // console.log(response);
            //save the token userId and expire time(ms) in local storage by Firebase
            // localStorage.setItem('token', response.data.idToken);
            // localStorage.setItem('userId', response.data.localId);
            // const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000) //multiply 1000 casuse get time () in ms and expiresIn is 3600sec
            // localStorage.setItem('expirationTime', expirationTime);
            // dispatch(authSuccess(response.data.idToken, response.data.localId))
            if (mode === 'Login') {
                const user_id = saveTokenDataAndGetUserId(response.data.access)
                dispatch(authSuccess(response.data.access, user_id));
            }
            else {
                return axios.post("http://127.0.0.1:8000/api/token/", authData)
                    .then(response => {
                        const user_id = saveTokenDataAndGetUserId(response.data.access)
                        dispatch(authSuccess(response.data.access, user_id));
                    })
            }

        })
        .catch(err => {
            dispatch(authLoading(false));
            const key = Object.keys(err.response.data)[0];
            // console.log(err.response)
            //console.log(key);
            const errValue = err.response.data[key];
            // dispatch(authFailed(err.response.data.error.message))
            dispatch(authFailed(errValue))
        })

}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return { type: actionTypes.AUTH_LOGOUT };

}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    }
    else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }

}
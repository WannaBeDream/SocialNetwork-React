import { authAPI, securityAPI } from './../api/api';
import { stopSubmit } from 'redux-form';


const SET_USER_DATA = "socialNetwork/auth/SET-USER-DATA";
const TOGGLE_IS_FETCHING = "socialNetwork/auth/TOGGLE-IS-FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "socialNetwork/auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
    captchaUrl: null,
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        };
        case GET_CAPTCHA_URL_SUCCESS: {
            return { ...state, ...action.payload }
        };
        default:
            return state;
    }
}



export const setAuthUserData = (userId, email, login, isAuth) => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
);
export const getCaptchaUrlSuccess = (captchaUrl) => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} }
);
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getAuthUserData = () =>
    async (dispatch) => {
        let response = await authAPI.authMeWithCredentials();

        if (response.data.resultCode === 0) {
            let { login, id, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message })); //  stopSubmit -> actionCreator из redux-from
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl)); //  stopSubmit -> actionCreator из redux-from
   
}


export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;
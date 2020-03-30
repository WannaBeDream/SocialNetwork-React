import { authAPI, securityAPI } from './../api/api';
import { stopSubmit } from 'redux-form';


const SET_USER_DATA = "socialNetwork/auth/SET-USER-DATA";
const TOGGLE_IS_FETCHING = "socialNetwork/auth/TOGGLE-IS-FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "socialNetwork/auth/GET-CAPTCHA-URL-SUCCESS";

// export type InitialStateType = {
//     captchaUrl: string | null
//     userId: number | null
//     login: string | null 
//     email: string | null
//     isAuth: boolean 
//     isFetching: boolean
// }

let initialState = {
    captchaUrl: null as string | null,
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    isFetching: false as boolean,
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
);

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} }
);

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getAuthUserData = () =>
    async (dispatch: any) => {
        let response = await authAPI.authMeWithCredentials();

        if (response.data.resultCode === 0) {
            let { login, id, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl)); //  stopSubmit -> actionCreator из redux-from
   
}


export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;
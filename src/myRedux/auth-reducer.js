import {authAPI} from './../api/api'

const SET_USER_DATA = "SET-USER-DATA";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
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
                ...action.data,
                isAuth: true,
            };
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        };
        default:
            return state;
    }
}



export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA,  data: { userId, email, login} });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING,  isFetching });

export const authWithCredentials = () => {
    return (dispatch) => {
        authAPI.authMeWithCredentials()
        .then(response => {
          if(response.data.resultCode === 0) {
              let {login, id, email} = response.data.data;
              dispatch(setAuthUserData(id, email, login));
          }
       });
    }
}

export default authReducer;
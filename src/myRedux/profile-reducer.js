import { profileAPI } from './../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = "socialNetwork/profile/ADD-POST";
const SET_USER_PROFILE = "socialNetwork/profile/SET-USER-PROFILE";
const SET_USER_STATUS = "socialNetwork/profile/SET-USER-STATUS";
const DELETE_POST = "socialNetwork/profile/DELETE-POST";
const SAVE_USER_PHOTO_SUCCESS = "socialNetwork/profile/SAVE-USER-PHOTO-SUCCESS";



let initialState = {
    posts:
        [
            { id: 0, message: 'Hi, how are you?', likesCount: 12 },
            { id: 1, message: 'It\'s my first post', likesCount: 11 },
            { id: 2, message: 'Blabla', likesCount: 11 },
            { id: 3, message: 'Dada', likesCount: 11 }
        ],
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {  // сделал reducer чистой функцией 
        case ADD_POST: {
            let newPost = {
                id: state.posts.length,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
            // stateCopy.posts = [...state.posts];   // создал копию массива для работы метода сonnect(для сравнения), чтобы перерендер был
            // stateCopy.posts.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status };
        }
        case SAVE_USER_PHOTO_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((post) => post.id != action.postId)
            }
        }
        default:
            return state;
    }
}


export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const saveUserPhotoSuccess = (photos) => ({ type: SAVE_USER_PHOTO_SUCCESS, photos });


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(response.data));
}
    ;
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
   try {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
    } catch(error) {
        alert(`Status code ${error.response.status}` ); // ТАК НЕ ДЕЛАТЬ
    }
};

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(saveUserPhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        // let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] })); //  stopSubmit -> actionCreator из redux-from
        return Promise.reject(response.data.messages[0])
    }
};

export default profileReducer;
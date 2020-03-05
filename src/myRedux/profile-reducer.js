import {profileAPI} from './../api/api';

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

let initialState = {
    posts:
        [
            { id: 0, message: 'Hi, how are you?', likesCount: 12 },
            { id: 1, message: 'It\'s my first post', likesCount: 11 },
            { id: 2, message: 'Blabla', likesCount: 11 },
            { id: 3, message: 'Dada', likesCount: 11 }
        ],
    profile: null ,
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
            return {...state, profile: action.profile};
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status};
        }
        default:
            return state;
    }
}


export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });


export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getUserProfile(userId)    
           .then(response => {
              dispatch(setUserProfile(response.data));
          });
}
;
export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId)    
           .then(response => {
              dispatch(setUserStatus(response.data));
          });
};

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status)    
           .then(response => {
               if(response.data.resultCode === 0 ) {
              dispatch(setUserStatus(status));
               }
          });
};

export default profileReducer;
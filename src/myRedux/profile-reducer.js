const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    posts:
        [
            { id: 0, message: 'Hi, how are you?', likesCount: 12 },
            { id: 1, message: 'It\'s my first post', likesCount: 11 },
            { id: 2, message: 'Blabla', likesCount: 11 },
            { id: 3, message: 'Dada', likesCount: 11 }
        ],
    newPostText: 'ky ky'
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {  // сделал reducer чистой функцией 
        case ADD_POST: {
            let newPost = {
                id: state.posts.length,
                message: state.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',

            };
            // stateCopy.posts = [...state.posts];   // создал копию массива для работы метода сonnect(для сравнения), чтобы перерендер был
            // stateCopy.posts.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.newText};

            // stateCopy.newPostText = action.newText;
            // return stateCopy;
        }
        default:
            return state;
    }
}


export const addPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;
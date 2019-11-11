const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"; 
const SEND_MESSAGE ="SEND_MESSAGE";

let store = {
    _state: {
        profilePage: {
            posts:
                [
                    { id: 0, message: 'Hi, how are you?', likesCount: 12 },
                    { id: 1, message: 'It\'s my first post', likesCount: 11 },
                    { id: 2, message: 'Blabla', likesCount: 11 },
                    { id: 3, message: 'Dada', likesCount: 11 }
                ],
            newPostText: 'ky ky'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andrew' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How is your it-kamasutra?' },
                { id: 3, message: 'Yo' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' }
            ],
            newMessageBody: '',
        },
        sidebar: {

        },
    },
    _callSubscriber() { // заменил эту функцию на функцию из index.js использую callbacks
        console.log('state was changed')
    },


    getState() {
        return this._state
    },
    subscribe(observer) { // перезаписал функцию при вызове subscribe 
        this._callSubscriber = observer;       // паттерн observer (addEventListner)
    },

    dispatch(action) {   // { type: 'ADD-POST', message:'HEllo man!'}
        if (action.type === ADD_POST) {
            let newPost = {
                id: this._state.profilePage.posts.length,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.newBody;
            this._callSubscriber(this._state);
        } else if(action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push({id:6 , message: body})
            this._callSubscriber(this._state);
        }
    }
}

export const addPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, newBody: text });


export default store;
window.store = store //проверка  в браузере  BBL чтобі узнать где фиксируются данные, сейчас в state.profilePage.newPostText , но это не лучший пример т.к. используется круговая зависимость хоть и через render.js
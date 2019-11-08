let store = {
    _state : {
        profilePage:{
            posts : 
            [
            {id: 0, message: 'Hi, how are you?', likesCount: 12},
            {id: 1, message: 'It\'s my first post', likesCount: 11},
            {id: 2, message: 'Blabla', likesCount: 11},
            {id: 3, message: 'Dada', likesCount: 11}
            ],
            newPostText:'ky ky'
        },
        dialogsPage:{
            dialogs : [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrew'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Valera'}
            ],
            messages : [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
        },
        sidebar:{
           
        },
},
    getState() {
    return this._state
    },
    _callSubscriber() { // заменил эту функцию на функцию из index.js использую callbacks
    console.log('state was changed')
},
    addPost() {
    let newPost = {
        id: this._state.profilePage.posts.length,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
    }
    this._state.profilePage.posts.push(newPost);
    this._callSubscriber(this._state);
},
    updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
},
    subscribe(observer) { // перезаписал функцию при вызове subscribe 
    this._callSubscriber = observer;       // паттерн observer (addEventListner)
}
}

export default store;
window.store = store //проверка  в браузере  BBL чтобі узнать где фиксируются данные, сейчас в state.profilePage.newPostText , но это не лучший пример т.к. используется круговая зависимость хоть и через render.js
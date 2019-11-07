let rerenderEntireTree = () => { // заменил эту функцию на функцию из index.js использую callback
    console.log('state was changed')
}

let state = {
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
}

window.state = state //проверка  в браузере  BBL чтобі узнать где фиксируются данные, сейчас в state.profilePage.newPostText , но это не лучший пример т.к. используется круговая зависимость хоть и через render.js

export const addPost = () => {
    let newPost = {
        id: state.profilePage.posts.length,
        message: state.profilePage.newPostText,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => { // перезаписал функцию при вызове subscribe 
    rerenderEntireTree = observer;       // паттерн observer (addEventListner)
}
export default state;
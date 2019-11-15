import * as serviceWorker from './serviceWorker';
import store from './myRedux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";



// Карта вызовов    1) rerenderEntireTree(state) из index.js; 
//                  2) вызов onClick/onChange={addPost};
//                  3) addPost вызывает метод в state через прокинутые через компоненты props;
//                  4) вызов наблюдателя(observer) который заменяет rerenderEntireTree из index.js на  rerenderEntireTree из state.js при помощи callbacks 
//                  P.S. про перезапись observer не точно

let rerenderEntireTree = (state) => {  // Варианты: 1)Прокидываю state через пропсы для Dialogs; 2)Прокидываю отдельно Dispatch и state для MyPosts

    ReactDOM.render(
        <BrowserRouter>
            <App appState={state} dispatch={store.dispatch.bind(store)} store={store}/> 
        </BrowserRouter>
        , document.getElementById('root'));
}
rerenderEntireTree(store.getState()); // первая отрисовка для взаимодействия чтобы после подключить observer 

store.subscribe(()=> {
    let state = store.getState(); // для того чтобы state передался стором(store)
    rerenderEntireTree(state);   // redux store не передает state при уведомлении подписчиков 
}); 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

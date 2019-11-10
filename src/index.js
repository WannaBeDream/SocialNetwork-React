import * as serviceWorker from './serviceWorker';
import store from './myRedux/state'
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

let rerenderEntireTree = (state) => {

    ReactDOM.render(
        <BrowserRouter>
            <App appState={state} dispatch={store.dispatch.bind(store)} />
        </BrowserRouter>
        , document.getElementById('root'));
}
rerenderEntireTree(store.getState()); // первая отрисовка для взаимодействия чтобы после подключить observer 

store.subscribe(rerenderEntireTree); // подписал наблюдателя ReactDom.render тем самым связав state и методы 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

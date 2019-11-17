import * as serviceWorker from './serviceWorker';
import store from './myRedux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {Provider} from './StoreContext';


let rerenderEntireTree = () => {  
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider >
        </BrowserRouter>
        , document.getElementById('root'));
}
rerenderEntireTree(); // первая отрисовка для взаимодействия чтобы после подключить observer 

store.subscribe(() => {
    rerenderEntireTree();   // redux store не передает state при уведомлении подписчиков 
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

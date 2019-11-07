import * as serviceWorker from './serviceWorker';
import state,{subscribe} from './myRedux/state'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { addPost, updateNewPostText } from './myRedux/state'




let rerenderEntireTree = (state) => {

    ReactDOM.render(
        <BrowserRouter>
            <App appState={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>
        , document.getElementById('root'));
}
rerenderEntireTree(state); // первая отрисовка для взаимодействия чтобы после подключить observer 

subscribe(rerenderEntireTree); // подписал наблюдателя ReactDom.render тем самым связав state и методы 


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

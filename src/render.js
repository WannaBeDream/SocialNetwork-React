import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { addPost } from './myRedux/state'


export let rerenderEntireTree = (state) => {

    ReactDOM.render(
        <BrowserRouter>
            <App appState={state} addPost={addPost} />
        </BrowserRouter>
        , document.getElementById('root'));
}


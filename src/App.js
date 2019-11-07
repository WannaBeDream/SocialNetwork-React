import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";

const App = (props) => {
    return ( <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs dialogs={props.appState.dialogsPage.dialogs} messages={props.appState.dialogsPage.messages}/>}/> {/*/dialogs/spam/blabla*/}
                    <Route path='/profile' render={() => <Profile 
                    posts={props.appState.profilePage.posts}
                    addPost={props.addPost}
                    />}/>
                </div>
            </div>)
}

export default App;
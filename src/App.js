import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Route } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import NewsContainer from './components/News/NewsContainer';
import LoginContainer from './components/Login/LoginContainer';
import { initializeApp } from './myRedux/app-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader />

        }

        return (<div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <DialogsContainer
                />} />
                <Route path='/profile/:userId?' render={() => <ProfileContainer
                />} />
                <Route path='/users' render={() => <UsersContainer />} />
                <Route path='/news' render={() => <NewsContainer />} />
                <Route path='/login' render={() => <LoginContainer />} />
            </div>
        </div>)
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(  // withRouter подключили из-за того что роуты не будут работать с законекченой компонентой
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);
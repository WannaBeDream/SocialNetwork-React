import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
// import ProfileContainer from './components/Profile/ProfileContainer';
import { Route } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
// import NewsContainer from './components/News/NewsContainer';
import LoginContainer from './components/Login/LoginContainer';
import { initializeApp } from './myRedux/app-reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './myRedux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';

const NewsContainerWithLazy = React.lazy(() => import('./components/News/NewsContainer'));
const ProfileContainerWithLazy = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainerWithLazy = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader />

        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer
                    />} />
                    <Route path='/profile/:userId?' render={
                        withSuspense(ProfileContainerWithLazy)
                    } />
                    <Route path='/users' render={
                        withSuspense(UsersContainerWithLazy)
                    } />
                    <Route path='/news' render={
                        withSuspense(NewsContainerWithLazy)
                    } />
                    <Route path='/login' render={() => <LoginContainer />} />
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(  // withRouter подключили из-за того что роуты не будут работать с законекченой компонентой
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);


let MainApp = (props) => {
    return (<BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider >
    </BrowserRouter>)
}

export default MainApp;
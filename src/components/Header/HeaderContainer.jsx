import React from "react";
import Header from './Header';
import {authAPI} from './../../api/api'
import {connect} from 'react-redux';
import {setAuthUserData} from './../../myRedux/auth-reducer';

class HeaderContainer extends React.Component {
  
  componentDidMount() {
    authAPI.authMeWithCredentials()
           .then(response => {
             if(response.data.resultCode === 0) {
                 let {login, id, email} = response.data.data;
                 this.props.setAuthUserData(id, email, login);
             }
          });
  }
  
  
    render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) =>({
     isAuth: state.auth.isAuth,
     login: state.auth.login,
}
)


export default connect( mapStateToProps,{setAuthUserData})(HeaderContainer);

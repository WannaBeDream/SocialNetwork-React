import React from "react";
import Header from './Header';
import {connect} from 'react-redux';
import {authWithCredentials} from './../../myRedux/auth-reducer';

class HeaderContainer extends React.Component {
  
  componentDidMount() {     
   this.props.authWithCredentials();
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


export default connect( mapStateToProps,{authWithCredentials})(HeaderContainer);

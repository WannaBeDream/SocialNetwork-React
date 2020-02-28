import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Preloader from '../common/Preloader/Preloader';



class LoginAPIComponent extends React.Component {

  componentDidMount() {
   
  }



  render(){

    return ( <Login  />
    )
    
    

  }
};


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }



// let UsersContainer = connect(mapStateToProps,
//     {   follow,
//         unfollow,
//         setCurrentPage,
//         getUsers: getUsersThunkCreator,
//         changeCurrentPage: changeCurrentPageThunkCreator
//     }
//     )(UsersAPIComponent);

export default LoginAPIComponent;
import React from "react";
import { connect } from "react-redux";
import { changeCurrentPage ,requestUsers , follow, unfollow } from "../../myRedux/users-reducer";
import Users from "./Users";
import Preloader from './../common/Preloader/Preloader';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from './../../myRedux/users-selectors';


class UsersAPIComponent extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);

  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.changeCurrentPage(pageNumber, pageSize);
    
  }


  render(){

    return <>
    {this.props.isFetching ? 
        <Preloader /> : null}
     <Users totalUsersCount={this.props.totalUsersCount} 
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    />
    </>

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



let mapStateToProps = (state) => {  
  return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
  }
}

// let mapDispatchToProps = (dispatch) => {   // 1 вариант(изначальный)
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


let UsersContainer = connect(mapStateToProps,
    {   follow,
        unfollow,
        getUsers: requestUsers,  //санка
        changeCurrentPage: changeCurrentPage,  //санка
    }
    )(UsersAPIComponent);

export default UsersContainer;
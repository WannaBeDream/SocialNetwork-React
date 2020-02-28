import React from "react";
import { connect } from "react-redux";
import { changeCurrentPageThunkCreator ,getUsersThunkCreator, follow, unfollow, setCurrentPage } from "../../myRedux/users-reducer";
import Users from "./Users";
import Preloader from './../common/Preloader/Preloader';



class UsersAPIComponent extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);

  }

  onPageChanged = (pageNumber) => {
    this.props.changeCurrentPage(pageNumber, this.props.pageSize);
    
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


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch) => {
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
        setCurrentPage,
        getUsers: getUsersThunkCreator,
        changeCurrentPage: changeCurrentPageThunkCreator
    }
    )(UsersAPIComponent);

export default UsersContainer;
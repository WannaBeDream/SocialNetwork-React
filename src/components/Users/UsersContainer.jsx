import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC } from "../../myRedux/users-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
                                                    // TODO
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
                                                    // TODO
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }
    }
}


let UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users);

export default UsersContainer;
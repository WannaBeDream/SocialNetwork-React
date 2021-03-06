import React from "react";
import { connect } from "react-redux";
import { changeCurrentPage, requestUsers, follow, unfollow } from "../../myRedux/users-reducer";
import Users from "./Users";
import Preloader from './../common/Preloader/Preloader';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from './../../myRedux/users-selectors';
import { UserType } from "../../types/types";
import { AppStateType } from "../../myRedux/redux-store";
import { compose } from "redux";



type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
}
type MapDispatchPropsType = {
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
  changeCurrentPage: (pageNumber: number, pageSize: number) => void
}
type OwnPropsType = {  // то что стандартно прокинулось
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersAPIComponent extends React.Component<PropsType> {

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);

  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.changeCurrentPage(pageNumber, pageSize);

  }


  render() {

    return <>
      <h2>{this.props.pageTitle}</h2>
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




let mapStateToProps = (state: AppStateType): MapStatePropsType => {   // include selectors
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState

let UsersContainer = compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
  (mapStateToProps,
    {
      follow,
      unfollow,
      getUsers: requestUsers,  //санка
      changeCurrentPage: changeCurrentPage,  //санка
    }
  ))(UsersAPIComponent);

export default UsersContainer;
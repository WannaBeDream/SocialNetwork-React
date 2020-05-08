import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile
} from "./../../myRedux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "./../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType,PhotosType } from "../../types/types";
import { AppStateType } from "../../myRedux/redux-store";

type MapStatePropsType = {  // TODO me
  match?: any  
  history?: any

  authorizedUserId: number | null
  profile: ProfileType | null
  status: string
  isAuth: boolean
}
type MapDispatchPropsType = {  // TODO me
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (newStatus: string) => void
  savePhoto: (newPhoto: PhotosType) => void
  saveProfile: (newProfile: ProfileType) => void
}
type OwnPropsType = {  // то что стандартно прокинулось
 
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
        if(!userId) {
          this.props.history.push("/login");
        }
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  };

  componentDidUpdate(prevProps: MapStatePropsType, prevState: AppStateType) {  // TODO
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          saveProfile={this.props.saveProfile}
          savePhoto={this.props.savePhoto}
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
        />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState

export default compose(
  connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>
  (mapStateToProps, 
    { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile }),
  withRouter,
  // withAuthRedirect   // защита аунтефикация
)(ProfileContainer);

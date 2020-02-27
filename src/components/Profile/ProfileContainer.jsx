import React from "react";
import Profile from "./Profile";
import {usersAPI} from './../../api/api'
import {connect} from 'react-redux';
import {setUserProfile} from './../../myRedux/profile-reducer';
import {withRouter} from 'react-router-dom';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    usersAPI.getUserProfile(userId)    // TODO 1)Add thunk 
           .then(response => {
              this.props.setUserProfile(response.data);
          });
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent);

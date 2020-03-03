import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  }
  
  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateUserStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({status: e.currentTarget.value});
  }

  render() {
    return (
      <div className={s.ProfileStatusContainer}>
        {this.state.editMode ? (
          <div>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              onBlur={this.deactivateEditMode}
              autoFocus={true}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "everything awesome"}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;

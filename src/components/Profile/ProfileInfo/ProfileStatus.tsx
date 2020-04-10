import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string
  updateUserStatus: (newStatus: string) => void

}
type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
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

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({status: e.currentTarget.value});
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    console.log("ProfileStatus -> componentDidUpdate -> prevState", prevState)
    console.log("ProfileStatus -> componentDidUpdate -> prevProps", prevProps)
    if(prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      });
    }
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
              {this.props.status || "everything is awesome"}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;

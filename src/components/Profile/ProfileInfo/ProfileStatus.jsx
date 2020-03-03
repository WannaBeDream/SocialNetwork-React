import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    title: "Yo"
  };

  activateEditMode = () => {
    debugger;
    console.log('this', this)
    this.setState({
      editMode: true
    });
  }
  deactivateEditMode() {
    this.setState({
      editMode: false
    });
  }

  render() {
    return (
      <div className={s.ProfileStatusContainer}>
        {this.state.editMode ? (
          <div>
            <input
              value={this.props.status}
              onBlur={this.deactivateEditMode.bind(this)}
              autoFocus={true}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;

import React, { useState, useEffect } from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = props => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  console.log("ProfileStatusWithHooks -> editMode", editMode);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status] );

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  }

 const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div className={s.ProfileStatusContainer}>
      {editMode ? (
        <div>
          <input
              onChange={onStatusChange}
              value={status}
              onBlur={deactivateEditMode}
              autoFocus={true} />
        </div>
      ) : (
        <div>
          <span  onDoubleClick={activateEditMode}> {props.status || "everything is awesome"}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;

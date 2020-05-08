import React, { useState, useEffect, ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = { 
  status: string
  updateUserStatus: (newStatus: string) => void

}
type StateType = {  // TODO me
  editMode: boolean
  status: string
}

type MainPropsType = PropsType & StateType   // TODO me


const ProfileStatusWithHooks: React.FC<MainPropsType> = props => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

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

 const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          <b>Status:</b> <span  onDoubleClick={activateEditMode}> {props.status || "everything is awesome"}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;

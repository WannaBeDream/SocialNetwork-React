import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";
import ProfileDataReduxForm from "./ProfileDataForm";



const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile
}) => {

    let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = e => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit =  (formData) => {
    console.log("ProfileInfo -> onSubmit -> formData", formData);
        saveProfile(formData).then(() => {
            setEditMode(false);
        })

  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || profile.photos.small || userPhoto}
          alt="404"
        />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        { editMode ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> : <ProfileData toEditMode={ () => {
            setEditMode(true);
        }} profile={profile}  isOwner={isOwner}/>}
        <ProfileStatusWithHooks
          status={status}
          updateUserStatus={updateUserStatus}
        />
      </div>
    </div>
  );
};

const ProfileData = ({profile, isOwner, toEditMode}) => {
  return (
    <div>
        {isOwner &&
        <div>
            <button onClick={toEditMode}>Edit</button>
        </div>}
      <div>
        <b> Full name:</b> {profile.fullName}
      </div>
      <div>
        <b> Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b> My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b> About me:</b> {profile.aboutMe}
      </div>
      <div>
        {Object.keys(profile.contacts).map(key => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};


export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>
        {contactTitle}: {contactValue}
      </b>
    </div>
  );
};

export default ProfileInfo;

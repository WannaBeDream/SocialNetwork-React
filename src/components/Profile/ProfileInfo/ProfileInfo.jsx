import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png';


const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {                // TODO
    if(!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
       if(e.target.files.length) {
        savePhoto(e.target.files[0]);   

       }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || profile.photos.small || userPhoto} alt="404"/>  
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
                {/* <div>
                    <div>
                    {profile.fullName}
                    </div>
                    <div>
                    {profile.lookingForAJob}
                    </div>
                    <div>
                    {profile.lookingForAJobDescription}
                    </div>
                    <div>
                        <a href={profile.contacts.github}>{profile.contacts.github}</a> 
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ProfileInfo;
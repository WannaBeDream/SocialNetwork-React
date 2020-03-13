import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateUserStatus}) => {                // TODO
    if(!profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt="404"/>  
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
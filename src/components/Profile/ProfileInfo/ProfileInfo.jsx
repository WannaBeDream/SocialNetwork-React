import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';


const ProfileInfo = (props) => {                // TODO
    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'alt='404' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt="404"/>  
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;
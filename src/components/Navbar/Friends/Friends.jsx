import React from 'react';
import s from './../Navbar.module.css';
import FriendComponent from './Friend/Friend';

const Friends = () => {

    
    return (
            <div className={s.item}>
                <h3>Friends</h3>
                <div>
                    <FriendComponent />
                    <FriendComponent />
                    <FriendComponent />
                </div>
            </div>
    )
}

export default Friends;
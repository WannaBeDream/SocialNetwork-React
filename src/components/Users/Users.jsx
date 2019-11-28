import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from 'react-router-dom';

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i= 1; i <= pagesCount; i++ ) {
      pages.push(i);
    }

   return ( <div>
          <div>
            {pages.map(page => {
             return <span className={props.currentPage === page && styles.selectedPage}
             onClick={(e) => {
               props.onPageChanged(page);
             }}
             >{page}</span>
            })}
          </div>
          {props.users.map(user => (
            <div key={user.id}>
              <span>
                <div>
                  <NavLink to={`/profile/${user.id}`} >
                  <img src={user.photos.small != null ? user.photos.small : userPhoto} 
                  alt="404" 
                  className={styles.userPhoto} />
                  </NavLink>
                </div>
                <div>
                  {user.followed ? 
                    <button
                      onClick={() => {
                        props.unfollow(user.id);
                      }}> unfollow</button>
                   : <button onClick={() => {
                        props.follow(user.id);
                      }}> follow </button>
                  }
                </div>
              </span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
              </span>
            </div>
          ))}
        </div>
      );
}


export default Users;
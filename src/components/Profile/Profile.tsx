import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType} from "./../../types/types"
import { PhotosType} from "./../../types/types"

type PropsType = { // TODO me
  saveProfile: (newProfile: ProfileType) => void
  savePhoto: (newPhoto: PhotosType) => void
  updateUserStatus: (newStatus: string) => void
  isOwner: boolean
  profile: ProfileType | null
  status: string

}

const Profile: React.FC<PropsType> = props => {
  return (
    <div>
      <ProfileInfo
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

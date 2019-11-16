import React from "react";
import {
  addPostCreator,
  updateNewPostTextCreator
} from "../../../myRedux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = props => {
  let state = props.store.getState();

  let onAddPost = () => {
    props.store.dispatch(addPostCreator());
  };

  let onPostChange = text => {
    let action = updateNewPostTextCreator(text);
    props.store.dispatch(action);
    // props.updateNewPostText(text); // state меняется при каждом нажатии и сохраняется в state.profilePage.newPostText
  };

  return (
    <MyPosts
      updateNewPostText={onPostChange}
      addPost={onAddPost}
      posts={state.profilePage.posts}
      newPostText={state.profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;

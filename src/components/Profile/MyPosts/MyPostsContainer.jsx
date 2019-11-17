import React from "react";
import {
  addPostCreator,
  updateNewPostTextCreator
} from "../../../myRedux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () => {
 
  return (
    <StoreContext.Consumer>
      {store => {
        let state = store.getState();

        let onAddPost = () => {
          store.dispatch(addPostCreator());
        };

        let onPostChange = text => {
          let action = updateNewPostTextCreator(text);
          store.dispatch(action);
          // state меняется при каждом нажатии и сохраняется в state.profilePage.newPostText
        };

        return (
          <MyPosts
            updateNewPostText={onPostChange}
            addPost={onAddPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

export default MyPostsContainer;

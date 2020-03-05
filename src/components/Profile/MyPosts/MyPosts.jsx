import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddNewPostFormRedux from "./MyPostsFormContainer";

const MyPosts = props => {

  let postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  const onAddPost = (values) => {
    console.log("MyPosts -> addNewPost -> values.newPostText", values.newPostText)
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;

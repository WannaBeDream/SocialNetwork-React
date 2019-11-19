import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
  let newPostElement = React.createRef();

  let postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let onAddPost = () => {
    props.addPost(); // записываю значение из state.profilePage.newPostText в state.profilePage.posts
  };

  let onPostChange = () => {
    // меняю state.profilePage.newPostText
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <div className="form-group ml-5 mr-5 ">
            <textarea
            
              onChange={onPostChange}
              ref={newPostElement}
              value={props.newPostText}
              className="form-control"
              rows="3"
              cols="1"
            ></textarea>
          </div>
        </div>
        <div>
          <button onClick={onAddPost} type="button" className="btn btn-primary">
            Add post
          </button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;

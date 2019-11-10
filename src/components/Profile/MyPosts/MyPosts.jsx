import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../myRedux/state"


const MyPosts = props => {
  let newPostElement = React.createRef();

  let postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let addPost = () => {
    // props.addPost(); // записываю значение из state.profilePage.newPostText в state.profilePage.posts
    // let newText= '';
    // let actionAdd = {type:'ADD-POST'};
    // let actionUpdate = {type:'UPDATE-NEW-POST-TEXT', newText };
    props.dispatch(addPostActionCreator());
    // props.dispatch(actionUpdate); // зануление (изменение в state.profilePage.newPostText)
  };

  let onPostChange = () => {
    // меняю state.profilePage.newPostText
    let text = newPostElement.current.value;
    let action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
    // props.updateNewPostText(text); // state меняется при каждом нажатии и сохраняется в state.profilePage.newPostText
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          ></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;

import {
  addPost,
  updateNewPostText
} from "../../../myRedux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// есть доступ к стейту но не к стору
let mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
};


const MyPostsContainer = connect(mapStateToProps, 
    {
    addPost,
    updateNewPostText
    }
  )(MyPosts);


// connect возвращает новую контеййнерную компоненту
// первые два аргумента connect возвращают обьекты которые попадают в пропсы

export default MyPostsContainer;

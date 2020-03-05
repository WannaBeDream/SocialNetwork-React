import React from "react";
import s from "./MyPosts.module.css";
import { reduxForm, Field } from "redux-form";

let AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <div className="form-group ml-5 mr-5 ">
          <Field
            component={"textarea"}
            name={"newPostText"}
            className="form-control"
            rows="3"
            cols="1"
          />
        </div>
      </div>
      <div>
        <button className="btn btn-primary">
          Add post
        </button>
      </div>
    </form>
  );
};

let AddNewPostFormRedux = reduxForm({
  // a unique name for the form
  form: "ProfileAddNewPostForm"
})(AddNewPostForm);



export default AddNewPostFormRedux;

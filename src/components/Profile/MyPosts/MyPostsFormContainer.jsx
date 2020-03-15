import React from "react";
import s from "./MyPosts.module.css";
import { reduxForm, Field } from "redux-form";
// import { Field, reduxForm } from 'redux-form/immutable'
import {required, maxLengthCreator} from "./../../../utils/validators/validators";
import {TextArea} from "./../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)


let AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <div className="form-group ml-5 mr-5 ">
          <Field
            component={TextArea}
            name={"newPostText"}
            validate={[required, maxLength10]}
            className="form-control"
            rows="3"
            cols="150"
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

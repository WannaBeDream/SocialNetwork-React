import React from "react";
import s from "./Dialogs.module.css";
import { reduxForm, Field } from "redux-form";

const AddMessageForm = props => {   
  return (
    <form onSubmit={props.handleSubmit} className={s.containerHelperForTextArea}>
      <div className="form-group ml-5 mr-5 ">
        <Field
          component={"textarea"}
          name={"newMessageBody"}
          placeholder={"Enter your message"}
          className={"form-control"}
          rows={"3"}
          cols={"1"}
        />
      </div>
      <div>
        <button className="btn btn-primary">
          send message
        </button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({
  // a unique name for the form
  form: "dialogAddMessageForm"
})(AddMessageForm);


export default AddMessageReduxForm;

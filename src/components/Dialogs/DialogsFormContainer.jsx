import React from "react";
import s from "./Dialogs.module.css";
import { reduxForm, Field } from "redux-form";
import {required, maxLengthCreator} from "./../../utils/validators/validators";
import {TextArea} from "./../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = props => {   
  return (
    <form onSubmit={props.handleSubmit} className={s.containerHelperForTextArea}>
      <div className="form-group ml-5 mr-5 ">
        <Field
          component={TextArea}
          name={"newMessageBody"}
          validate={[required, maxLength50]}
          placeholder={"Enter your message"}
          className={"form-control"}
          rows={"3"}
          cols={"150"}
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

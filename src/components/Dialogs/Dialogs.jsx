import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm, Field } from "redux-form";

const AddMessageForm = props => {   // TODO!!!
  return (
    <form onSubmit={props.handleSubmit} className={s.containerHelperForTextArea}>
      <div className="form-group ml-5 mr-5 ">
        <Field
          component={"textarea"}
          name={"newMessageBody"}
          // ref={newMessageElement}
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

export const AddMessageReduxForm = reduxForm({
  // a unique name for the form
  form: "dialogAddMessageForm"
})(AddMessageForm);

const Dialogs = props => {
  let state = props.dialogsPage;
  // let newMessageBody = state.newMessageBody;

  let dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map(m => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  const addNewMessage = (values) => {      // TODO
    console.log("Dialogs -> addNewMessage -> values.newMessageBody", values.newMessageBody);
    props.sendMessage(values.newMessageBody);
 
    }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageReduxForm
        onSubmit={addNewMessage}
        
      />
    </div>
  );
};



export default Dialogs;

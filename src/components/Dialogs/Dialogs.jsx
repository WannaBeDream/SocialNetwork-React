import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageReduxForm from "./DialogsFormContainer";


const Dialogs = props => {
  let state = props.dialogsPage;

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

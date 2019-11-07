import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = props => {
  let dialogsElements = props.dialogs.map(d => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = props.messages.map(m => (
    <Message message={m.message} id={m.id} />
  ));
  let newMessageElement = React.createRef();
  let addMessage = () => {
      let newMessage = newMessageElement.current.value;
      alert(newMessage);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <div>
        <textarea ref={newMessageElement}></textarea>
      </div>
      <div>
        <button onClick={addMessage}>send message</button>
      </div>
    </div>
  );
};

export default Dialogs;

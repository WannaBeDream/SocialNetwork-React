import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = props => {

  let state = props.dialogsPage;
  let newMessageBody = state.newMessageBody;

  let dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map(m => (
    <Message message={m.message} id={m.id} />
  ));

  let onSendMessageClick = () => {
    props.sendMessage();
  };
  let onNewMessageChange = (event) => {
    let body = event.target.value;
    props.updateNewMessageBody(body);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <div>
        <div>
          <textarea
            value={newMessageBody}
            // ref={newMessageElement}
            placeholder="Enter your message"
            onChange={onNewMessageChange}
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>send message</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;

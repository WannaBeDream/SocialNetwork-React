import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";

const Dialogs = props => {
  let state = props.dialogsPage;
  let newMessageBody = state.newMessageBody;

  let dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map(m => (
    <Message message={m.message} key={m.id} id={m.id} />
  ));

  let onSendMessageClick = () => {
    props.sendMessage();
  };
  let onNewMessageChange = event => {
    let body = event.target.value;
    props.updateNewMessageBody(body);
  };

  if( !props.isAuth) return <Redirect to={"/login"}/> ;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <div className={s.containerHelperForTextArea}>
        <div className="form-group ml-5 mr-5 ">
          <textarea
            value={newMessageBody}
            // ref={newMessageElement}
            placeholder="Enter your message"
            onChange={onNewMessageChange}
            className="form-control"
            rows="3"
            cols="1"
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick} className="btn btn-primary">
            send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;

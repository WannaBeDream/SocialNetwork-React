import React from "react";
import {
  updateNewMessageBodyCreator,
  sendMessageCreator
} from "../../myRedux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from 'react-redux';



let mapStateToProps = (state) => { // есть доступ к стейту но не к стору
  return {
    dialogsPage: state.dialogsPage
  }
}
let mapDispatchToProps = (dispatch) => {  // store.dispatch.bind(state); ~
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs); // connect возвращает новую контеййнерную компоненту
// первые два аргумента connect возвращают обьекты которые попадают в пропсы
export default DialogsContainer;

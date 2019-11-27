import React from "react";
import {
  updateNewMessageBody,
  sendMessage
} from "../../myRedux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from 'react-redux';



let mapStateToProps = (state) => { // есть доступ к стейту но не к стору
  return {
    dialogsPage: state.dialogsPage  // когда эта часть стейта изменится метод connect перерисует компоненту
  }
}

// // store.dispatch.bind(state); ~
// let mapDispatchToProps = (dispatch) => {  
//   return {
//     updateNewMessageBody: (body) => {
//       dispatch(updateNewMessageBodyCreator(body));
//     },
//     sendMessage: () => {
//       dispatch(sendMessageCreator());
//     },
//   }
// }

const DialogsContainer = connect(mapStateToProps,
  {
    updateNewMessageBody,
    sendMessage
  }
  )(Dialogs); 

// connect возвращает новую контеййнерную компоненту
// первые два аргумента connect возвращают обьекты которые попадают в пропсы
export default DialogsContainer;

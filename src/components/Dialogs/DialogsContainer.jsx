import {
  updateNewMessageBody,
  sendMessage
} from "../../myRedux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";

let mapStateToProps = state => {
  // есть доступ к стейту но не к стору
  return {
    dialogsPage: state.dialogsPage, 
  };
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, {
  updateNewMessageBody,
  sendMessage
})(AuthRedirectComponent);

export default DialogsContainer;

import {
  updateNewMessageBody,
  sendMessage
} from "../../myRedux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage, 
  };
};


export default compose(
  connect(mapStateToProps, {
    updateNewMessageBody,
    sendMessage
  }),
  withAuthRedirect    // 1 withAuthRedirect обернет Dialogs, 2 сonnect  
)(Dialogs);           // compose((...p)=>connect((...p)=>withAuthRedirect(Component))) примерно

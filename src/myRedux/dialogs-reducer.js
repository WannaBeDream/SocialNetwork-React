const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ],
    newMessageBody: '',
};


const dialogsReducer = (state = initialState, action) => {

    let stateCopy;

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            stateCopy = {
                ...state,
                newMessageBody: action.newBody
            };
        // не использую потому что в mapStateTоProps запрашивается только state.DialogsPage
            return stateCopy;
        // state.newMessageBody = action.newBody;  // this._state.dialogsPage
        // return state;

        case SEND_MESSAGE:
            // let body = state.newMessageBody;
            // state.newMessageBody = '';
            // state.messages.push({ id: 6, message: body })
            // return state;
            let body = state.newMessageBody;

            stateCopy = {
                ...state,
                newMessageBody: '',                //именно в таком порядке
                messages: [...state.messages, { id: state.messages.length + 1, message: body }],
            };
            // stateCopy.messages.push({ id: 6, message: body }) 

            return stateCopy;

        default:
            return state;
    }
}



export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, newBody: text });

export default dialogsReducer;
const UPDATE_SOMETHING = 'UPDATE-SOMETHING'

let initialState = {};


const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SOMETHING:

            return state;

        default:
            return state;
    }
}

export default sidebarReducer;
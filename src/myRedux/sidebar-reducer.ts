const UPDATE_SOMETHING = 'socialNetwork/sidebar/UPDATE-SOMETHING'

let initialState = {};

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case UPDATE_SOMETHING:

            return state;

        default:
            return state;
    }
}

export default sidebarReducer;
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = "socialNetwork/app/INITIALIZED-SUCCESS";

export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS // typeof вернет "socialNetwork/app/INITIALIZED-SUCCESS"
}

export const initializedSuccess = (): InitializedSuccessActionType => (
    { type: INITIALIZED_SUCCESS }
);

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });

}

export default appReducer;
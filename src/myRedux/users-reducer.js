const FOLLOW_FRIEND = "FOLLOW-FRIEND";
const UNFOLLOW_FRIEND = "UNFOLLOW-FRIEND";
const SET_USERS = "SET-USERS";

let initialState = {
    users:
        [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_FRIEND:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                })

            };
        case UNFOLLOW_FRIEND:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                })

            };
        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] }
        };
        default:
            return state;
    }
}


export const followAC = (userId) => ({ type: FOLLOW_FRIEND, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW_FRIEND, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
const FOLLOW_FRIEND = "FOLLOW-FRIEND";
const UNFOLLOW_FRIEND = "UNFOLLOW-FRIEND";
const SET_USERS = "SET-USERS";

let initialState = {
    users:
        [
            { id: 1, followed: false, photoUrl: 'https://i2.wp.com/info-4all.ru/images/ecd5f29ff548715dc855639ffecfdfb7.png', fullName: 'Vasya', status: 'Im good man', location: { city: 'Dnepr', country: 'Ukraine' } },
            { id: 2, followed: true, photoUrl: 'https://i2.wp.com/info-4all.ru/images/ecd5f29ff548715dc855639ffecfdfb7.png', fullName: 'Petya', status: 'Ho-ho-ho', location: { city: 'Kiev', country: 'Ukraine' } },
            { id: 3, followed: false, photoUrl: 'https://i2.wp.com/info-4all.ru/images/ecd5f29ff548715dc855639ffecfdfb7.png', fullName: 'Denis', status: 'Dangerous', location: { city: 'Moscov', country: 'Russia' } },

        ],
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
        }
        default:
            return state;
    }
}


export const followAC = (userId) => ({ type: FOLLOW_FRIEND, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW_FRIEND, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
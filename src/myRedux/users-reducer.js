const FOLLOW_FRIEND = "FOLLOW-FRIEND";
const UNFOLLOW_FRIEND = "UNFOLLOW-FRIEND";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_USERS = "SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
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
            return { ...state, users: action.users }
        };
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        };
        case SET_TOTAL_COUNT_USERS: {
            return { ...state, totalUsersCount: action.count }
        };
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        };
        default:
            return state;
    }
}


export const followAC = (userId) => ({ type: FOLLOW_FRIEND, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW_FRIEND, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_COUNT_USERS, count: totalUsersCount });
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING,  isFetching });

export default usersReducer;
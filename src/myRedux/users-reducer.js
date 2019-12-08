const FOLLOW_FRIEND = "FOLLOW-FRIEND";
const UNFOLLOW_FRIEND = "UNFOLLOW-FRIEND";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_USERS = "SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

let initialState = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: []
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
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { ...state,
                 followingInProgress: action.isFetching 
                 ? [...state.followingInProgress, action.userId]
                 : state.followingInProgress.filter(id => id != action.userId) }
        };
        default:
            return state;
    }
}


export const follow = (userId) => ({ type: FOLLOW_FRIEND, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW_FRIEND, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_COUNT_USERS, count: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING,  isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS,  isFetching, userId });

export default usersReducer;
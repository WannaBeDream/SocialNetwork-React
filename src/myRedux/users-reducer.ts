import { usersAPI } from './../api/api';
import { UpdateObjectInArray } from '../utils/object-helpers';
import { PhotosType, UserType } from './../types/types';

const FOLLOW_FRIEND = "socialNetwork/users/FOLLOW-FRIEND";
const UNFOLLOW_FRIEND = "socialNetwork/users/UNFOLLOW-FRIEND";
const SET_USERS = "socialNetwork/users/SET-USERS";
const SET_CURRENT_PAGE = "socialNetwork/users/SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_USERS = "socialNetwork/users/SET-TOTAL-COUNT-USERS";
const TOGGLE_IS_FETCHING = "socialNetwork/users/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "socialNetwork/users/TOGGLE-IS-FOLLOWING-PROGRESS";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
};

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW_FRIEND:
            return {
                ...state,
                users: UpdateObjectInArray(state.users, action.userId, "id", { followed: true })
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: true }
                //     }
                //     return user;
                // })

            };
        case UNFOLLOW_FRIEND:
            return {
                ...state,
                users: UpdateObjectInArray(state.users, action.userId, "id", { followed: false })
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
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        };
        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW_FRIEND
    userId: number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW_FRIEND
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_COUNT_USERS
    count: number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW_FRIEND, userId });
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW_FRIEND, userId });
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_COUNT_USERS, count: totalUsersCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });


export const requestUsers = (page: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const changeCurrentPage = (pageNumber: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(pageNumber, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items))
    }
}

export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.userFollow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.userUnfollow.bind(usersAPI), unfollowSuccess);

    }
}



export default usersReducer;
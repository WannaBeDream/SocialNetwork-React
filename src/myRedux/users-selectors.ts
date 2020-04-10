import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUsersPrimitiveSelector = (state: AppStateType) => { // простой селектор(примитивный)
    return state.usersPage.users;
}

// export const getUsersSelector = (state) => { // селектор возвращающий новый обьект(неимьютабельный селектор) из за метода филтер
//     return getUsers(state).filter(u => true);
// }

export const getUsers = createSelector(getUsersPrimitiveSelector, (users) => {  // создатеь селектора с кешированием(для отмены ежесекундного перерендера)
    return users.filter(u => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
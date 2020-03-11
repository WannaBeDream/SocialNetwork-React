import { createSelector } from "reselect";

const getUsersPrimitiveSelector = (state) => { // простой селектор(примитивный)
    return state.usersPage.users;
}

// export const getUsersSelector = (state) => { // селектор возвращающий новый обьект(неимьютабельный селектор) из за метода филтер
//     return getUsers(state).filter(u => true);
// }

export const getUsers = createSelector(getUsersPrimitiveSelector, (users) => {  // создатеь селектора с кешированием(для отмены ежесекундного перерендера)
    return users.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
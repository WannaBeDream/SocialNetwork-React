import { newsAPI } from './../api/newsApi';

const SET_NEWS = "socialNetwork/news/SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "socialNetwork/news/SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_NEWS = "socialNetwork/news/SET_TOTAL_COUNT_NEWS";
const TOGGLE_IS_FETCHING = "socialNetwork/news/TOGGLE-IS-FETCHING";


let initialState = {
    news: [] as Array<any>,
    pageSize: 5,
    totalNewsCount: 0,
    currentNewsPage: 1,
    isFetching: true,
};

const newsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_NEWS: {
            return { ...state, news: action.news }
        };
        case SET_CURRENT_NEWS_PAGE: {
            return { ...state, currentNewsPage: action.currentNewsPage }
        };
        case SET_TOTAL_COUNT_NEWS: {
            return { ...state, totalNewsCount: action.count }
        };
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        };
        default:
            return state;
    }
}


type SetNewsActionType = {   // rewrite
    type: typeof SET_NEWS
    news: any
}
type SetCurrentNewsPageActionType = {
    type: typeof SET_CURRENT_NEWS_PAGE
    currentNewsPage: number
}
type SetTotalNewsCountActionType = {
    type: typeof SET_TOTAL_COUNT_NEWS
    count: number
}
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}


export const setNews = (news: any): SetNewsActionType => ({ type: SET_NEWS, news });
export const setCurrentNewsPage = (currentNewsPage: number): SetCurrentNewsPageActionType => ({ type: SET_CURRENT_NEWS_PAGE, currentNewsPage });
export const setTotalNewsCount = (totalNewsCount: number): SetTotalNewsCountActionType => ({ type: SET_TOTAL_COUNT_NEWS, count: totalNewsCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getNews = (currentNewsPage: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        let data = await newsAPI.getNews(currentNewsPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setNews(data.articles));
        dispatch(setTotalNewsCount(data.totalResults))

    }
}
export const changeCurrentPage = (pageNumber: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(setCurrentNewsPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data = await newsAPI.getNews(pageNumber, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setNews(data.articles))

    }
}

export default newsReducer;
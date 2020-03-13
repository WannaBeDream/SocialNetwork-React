import { newsAPI } from './../api/newsApi';

const SET_NEWS = "socialNetwork/news/SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "socialNetwork/news/SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_NEWS = "socialNetwork/news/SET_TOTAL_COUNT_NEWS";
const TOGGLE_IS_FETCHING = "socialNetwork/news/TOGGLE-IS-FETCHING";


let initialState = {
    news: [],
    pageSize: 5,
    totalNewsCount: 0,
    currentNewsPage: 1,
    isFetching: true,
};

const newsReducer = (state = initialState, action) => {
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



export const setNews = (news) => ({ type: SET_NEWS, news });
export const setCurrentNewsPage = (currentNewsPage) => ({ type: SET_CURRENT_NEWS_PAGE, currentNewsPage });
export const setTotalNewsCount = (totalNewsCount) => ({ type: SET_TOTAL_COUNT_NEWS, count: totalNewsCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getNews = (currentNewsPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await newsAPI.getNews(currentNewsPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setNews(data.articles));
        dispatch(setTotalNewsCount(data.totalResults))

    }
}
export const changeCurrentPage = (pageNumber, pageSize) => {

    return async (dispatch) => {
        dispatch(setCurrentNewsPage(pageNumber));
        dispatch(toggleIsFetching(true));
        let data = await newsAPI.getNews(pageNumber, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setNews(data.articles))

    }
}

export default newsReducer;
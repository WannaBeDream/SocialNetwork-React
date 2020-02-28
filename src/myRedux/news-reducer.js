import {newsAPI} from './../api/newsApi';

const SET_NEWS = "SET_NEWS";
const SET_CURRENT_NEWS_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT_NEWS = "SET_TOTAL_COUNT_NEWS";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";


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

    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        newsAPI.getNews(currentNewsPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setNews(data.articles));
                dispatch(setTotalNewsCount(data.totalResults))
            });
    }
}
export const changeCurrentPage = (pageNumber, pageSize) => {

    return (dispatch) => {
        dispatch(setCurrentNewsPage(pageNumber));
        dispatch(toggleIsFetching(true));  
        newsAPI.getNews(pageNumber, pageSize)
               .then(data => { 
                dispatch(toggleIsFetching(false));     
                dispatch(setNews(data.articles))});
    }
}

export default newsReducer;
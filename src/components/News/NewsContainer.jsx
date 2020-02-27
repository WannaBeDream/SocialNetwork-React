import React from "react";
import { connect } from "react-redux";
import { setNews, setCurrentNewsPage, setTotalNewsCount, toggleIsFetching } from "../../myRedux/news-reducer";
import News from "./News";
import Preloader from './../common/Preloader/Preloader';
import {newsAPI} from './../../api/newsApi';

class NewsAPIComponent extends React.Component {

 
  componentDidMount() {
    this.props.toggleIsFetching(true);    // TODO 1)Add thunk 
    newsAPI.getNews(this.props.currentNewsPage,this.props.pageSize)
              .then(data => {
              this.props.toggleIsFetching(false);  
              this.props.setNews(data.articles);
              this.props.setTotalNewsCount(data.totalResults)
          });
  }

  onPageChanged = (pageNumber) => {       // TODO 1)Add thunk 
    this.props.setCurrentNewsPage(pageNumber);
    this.props.toggleIsFetching(true);  
    newsAPI.getNews(pageNumber, this.props.pageSize)
           .then(data => { 
            this.props.toggleIsFetching(false);     
            this.props.setNews(data.articles)});
  }


  render(){

    return <>
    {this.props.isFetching ? 
        <Preloader /> : null}
     <News totalNewsCount={this.props.totalNewsCount} 
                    pageSize={this.props.pageSize}
                    currentNewsPage={this.props.currentNewsPage}
                    news={this.props.news}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    />
    </>

  }
};


let mapStateToProps = (state) => {
    return {
        news: state.newsPage.news,
        pageSize: state.newsPage.pageSize,
        totalNewsCount: state.newsPage.totalNewsCount,
        currentNewsPage: state.newsPage.currentNewsPage,
        isFetching: state.newsPage.isFetching,
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


let NewsContainer = connect(mapStateToProps,
    {  
        setNews,
        setCurrentNewsPage,
        setTotalNewsCount,
        toggleIsFetching,
    }
    )(NewsAPIComponent);

export default NewsContainer;
import React from "react";
import { connect } from "react-redux";
import { getNews, changeCurrentPage } from "../../myRedux/news-reducer";
import News from "./News";
import Preloader from "./../common/Preloader/Preloader";

class NewsAPIComponent extends React.Component {
  componentDidMount() {
    this.props.getNews(this.props.currentNewsPage, this.props.pageSize);
  }

  onPageChanged = pageNumber => {
    this.props.changeCurrentPage(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <News
          totalNewsCount={this.props.totalNewsCount}
          pageSize={this.props.pageSize}
          currentNewsPage={this.props.currentNewsPage}
          news={this.props.news}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = state => {
  return {
    news: state.newsPage.news,
    pageSize: state.newsPage.pageSize,
    totalNewsCount: state.newsPage.totalNewsCount,
    currentNewsPage: state.newsPage.currentNewsPage,
    isFetching: state.newsPage.isFetching
  };
};

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

let NewsContainer = connect(mapStateToProps, {
  getNews,
  changeCurrentPage
})(NewsAPIComponent);

export default NewsContainer;

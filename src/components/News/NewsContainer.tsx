import React from "react";
import { connect } from "react-redux";
import { getNews, changeCurrentPage } from "../../myRedux/news-reducer";
import News from "./News";
import Preloader from "./../common/Preloader/Preloader";
import { NewsType } from "../../types/types";
import { AppStateType } from "../../myRedux/redux-store";



type MapStatePropsType = { // TODO me
  news: Array<NewsType>
  pageSize: number
  totalNewsCount: number
  currentNewsPage: number
  isFetching: boolean


}
type MapDispatchPropsType = {
  getNews: (currentNewsPage: number, pageSize: number)=> void
  changeCurrentPage: (pageNumber: number, pageSize: number) => void
}
type OwnPropsType = {  // то что стандартно прокинулось
  
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class NewsAPIComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getNews(this.props.currentNewsPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
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
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    news: state.newsPage.news,
    pageSize: state.newsPage.pageSize,
    totalNewsCount: state.newsPage.totalNewsCount,
    currentNewsPage: state.newsPage.currentNewsPage,
    isFetching: state.newsPage.isFetching
  };
};

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState

let NewsContainer = connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>
(mapStateToProps, 
  {
  getNews,
  changeCurrentPage
  }
)(NewsAPIComponent);

export default NewsContainer;

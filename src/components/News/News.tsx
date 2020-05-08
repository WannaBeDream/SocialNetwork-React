import React from "react";
import styles from "./News.module.css";
import { NewsType } from "../../types/types";

type PropsType = {   // TODO data-className to className
  totalNewsCount: number
  pageSize: number
  currentNewsPage: number
  news: Array<NewsType>
  onPageChanged: (newPage: number) => void
}


let News: React.FC<PropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalNewsCount / props.pageSize);
    let pages: Array<number> = [];
    for(let i= 1; i <= pagesCount; i++ ) {
      pages.push(i);
    }

   return ( <div>
          <div>
            {pages.map((page: number) => {
             return <span data-className={props.currentNewsPage === page && styles.selectedPage}
             onClick={(e) => {
               props.onPageChanged(page);
             }}
             >{page}</span>
            })}
          </div>
          <hr/>
          {props.news.map(item => (
            <div key={item.source.id}>
              <span>
                <div>
                author:{item.author}
                <br/>
                title:{item.title}
                <br/>
                description:{item.description}
                <br/>
                </div>
                <div>
                <img src={item.url && item.urlToImage} alt="404" className={styles.newsImage}/>
    
                </div>
              </span>
              <span>
                <div>{item.publishedAt}</div>
                <div>{item.content}</div>
              </span>
              <hr/>
            </div>
          ))}
        </div>
      );
}


export default News;
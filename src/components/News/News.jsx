import React from "react";
import styles from "./News.module.css";

let News = (props) => {
    let pagesCount = Math.ceil(props.totalNewsCount / props.pageSize);
    let pages = [];
    for(let i= 1; i <= pagesCount; i++ ) {
      pages.push(i);
    }

   return ( <div>
          <div>
            {pages.map(page => {
             return <span className={props.currentNewsPage === page && styles.selectedPage}
             onClick={(e) => {
               props.onPageChanged(page);
             }}
             >{page}</span>
            })}
          </div>
          <hr/>
          {props.news.map(item => (
            <div>
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
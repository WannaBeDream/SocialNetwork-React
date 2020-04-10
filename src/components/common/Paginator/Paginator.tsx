import React, {useState} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";


type PropsType = {
  totalItemsCount:number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

let Paginator: React.FC<PropsType> = ({ totalItemsCount,
                                    pageSize,
                                    currentPage,
                                    onPageChanged,
                                    portionSize = 10 }) => {
                                      
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    
      <div className={styles.paginator}>
        <div className={styles.paginatorContainer}>
        {portionNumber > 1 && 
          <button className={"btn-primary"} onClick={() => {setPortionNumber(portionNumber - 1)}} >prev</button>  }

          {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(page => {
          return (
          <div>
          <span
            className={ cn({
              [styles.selectedPage]: currentPage === page
            }, styles.pageNumber)}
            key={page}
            onClick={e => {
              onPageChanged(page);
            }}
          >
            {page}
          </span>
          </div>
        );
      })}
      
   {portionCount > portionNumber && 
      <button className={"btn-primary"} onClick={() => {setPortionNumber(portionNumber + 1)}} >next</button>  }

      </div>
    </div>
  );
};

export default Paginator;

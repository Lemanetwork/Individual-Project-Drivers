import { useState } from 'react';
import style from './Pagination.module.css';

export default function Pagination({ currentPage, maxNumberOfPages, pagination, setCurrentPage }) {
    const [pageNumberLimit, setPageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const numberOfPages = [];

    for (let i = 1; i <= maxNumberOfPages; i++) {
        numberOfPages.push(i);
    }

    function handlePrevious() {
        if(currentPage > 1)
        setCurrentPage(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit === 0) {
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        }
    }

    function handleNext() {
        if(currentPage < maxNumberOfPages)
        setCurrentPage(currentPage + 1);

        if(currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    return (
        <nav>
            <ul className={style.list}>
                <li><button className={style.prevButton} onClick={handlePrevious} disabled={currentPage === numberOfPages[0] ? true : false} >Prev</button></li>
                {currentPage !== 1 ? <li className={style.dots}>...</li> : null}

                {numberOfPages && numberOfPages.map(pageNumber => (
                    pageNumber < maxPageNumberLimit + 1 && pageNumber > minPageNumberLimit
                    ? <li className={currentPage === pageNumber ? style.active : style.itemNumber} key={pageNumber}>
                    <a onClick={() => pagination(pageNumber)}>{pageNumber}</a>
                </li> : null
                ))}

                {currentPage !== maxNumberOfPages ? <li className={style.dots}>...</li> : null}
                <li><button className={style.nextButton} onClick={handleNext} disabled={currentPage === numberOfPages[maxNumberOfPages - 1] ? true : false} >Next</button></li>
            </ul>
        </nav>
    )
}
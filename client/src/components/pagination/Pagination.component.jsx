import style from './Pagination.module.css';

export default function Pagination({driversPerPage, allDrivers, pagination}) {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allDrivers/driversPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={style.list}>
                {pageNumbers && pageNumbers.map(pageNumber => (
                    <li className={style.itemNumber} key={pageNumber}>
                        <a onClick={() => pagination(pageNumber)}>{pageNumber}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
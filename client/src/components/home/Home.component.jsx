import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers } from '../../redux/actions/actions';
import Cards from  '../cards/Cards.component';
import NavigationBar from '../navbar/NavigationBar.component';
import Pagination from '../pagination/Pagination.component';
import style from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage, setDriversPerPage] = useState(9);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFristDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(indexOfFristDriver, indexOfLastDriver);
  const maxNumberOfPages = Math.ceil(allDrivers.length/driversPerPage);

  function pagination (pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleReload(event) {
    event.preventDefault();
   dispatch(getAllDrivers());
  };
  
  useEffect(()=>{
    if(currentDrivers.length === 0)
      dispatch(getAllDrivers());
  }, [dispatch]);
  
  if(allDrivers.length > 0)
    return (
      <div className={style.divHome}>
          <NavigationBar handleReload={handleReload} pagination={pagination}/>
          <Pagination currentPage={currentPage} maxNumberOfPages={maxNumberOfPages} pagination={pagination} setCurrentPage={setCurrentPage} />
          <Cards currentDrivers={currentDrivers} />
          <p>© Copyright 2024 by Luis Manjarrez. All Rights Reserved.</p>
      </div>
    );
  else
    return (
      <div className={style.divLoader}>
        <button onClick={handleReload} className={style.loadDrivers}>Loading...</button>
      </div>
    );
};
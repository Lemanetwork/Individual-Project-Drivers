import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers, getDriversByName } from '../../redux/actions/actions';
import Cards from  '../cards/Cards.component';
import NavigationBar from '../navbar/NavigationBar.component';
import Pagination from '../pagination/Pagination.component';
import './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector(state => state.allDrivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage, setDriversPerPage] = useState(9);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFristDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(indexOfFristDriver, indexOfLastDriver);
  
  const pagination = pageNumber => {
    setCurrentPage(pageNumber);
  }

  function handleReload(event) {
    event.preventDefault();
   dispatch(getAllDrivers());
  };

  useEffect(()=>{
    dispatch(getAllDrivers());
    // return (()=> clearDetail()); //! CLEAR SCREEN
  }, [dispatch]);
  
  return (
    <div>
        <NavigationBar handleReload={handleReload} pagination={pagination}/>
        <Pagination driversPerPage={driversPerPage} allDrivers={allDrivers.length} pagination={pagination}/>
        <Cards currentDrivers={currentDrivers} />
      </div>
  )
};
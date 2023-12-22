import './NavigationBar.module.css';
import SearchBar from '../searchbar/SearchBar.component';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTeams, filterDriversByTeam, filterDriversBySource, orderDrivers } from '../../redux/actions/actions';

export default function NavigationBar({handleReload, pagination}) {
  const dispatch = useDispatch();
  const allTeams = useSelector(state => state.allTeams);

  function handleFilterByTeam(event) {
    dispatch(filterDriversByTeam(event.target.value))
    pagination(1);
  }

  function handleFilterBySource(event) {
    dispatch(filterDriversBySource(event.target.value))
    pagination(1);
  }

  function handleOrder(event) {
    dispatch(orderDrivers(event.target.value))
    pagination(1);
  }

  useEffect(()=> {
    dispatch(getTeams());
  },[]);

  return (
      <div>
        <label>Filter by Team: </label>
        <select name="filterByTeam" onChange={handleFilterByTeam} defaultValue={'all'}>
          <option value='all'>All</option>
          {allTeams.map((team) => (
            <option value={team} key={team}>{team}</option>
          ))};
        </select>
        <label>Filter by Source: </label>
        <select name="filterBySource" onChange={handleFilterBySource} defaultValue={'all'}>
          <option value='all'>All</option>
          <option value='api'>API</option>
          <option value='db'>DB</option>
        </select>
        <label>Order: </label>
        <select name="order" onChange={handleOrder} defaultValue={'null'}>
          <option value='null' disabled={'disabled'}></option>
          <option value='ascAlp'>Ascending Alphabetically</option>
          <option value='desAlp'>Descending Alphabetically</option>
          <option value='ascDob'>Ascending by DOB</option>
          <option value='desDob'>Descending by DOB</option>
        </select>
        <Link to={'/create'}><button>Create Driver</button></Link>
        <button onClick={handleReload}>Reload all Drivers</button>
        <SearchBar pagination={pagination} />
      </div>
  )
};
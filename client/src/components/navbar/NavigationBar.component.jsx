import SearchBar from '../searchbar/SearchBar.component';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTeams, filterDriversByTeam, filterDriversBySource, orderDrivers, globalFilter } from '../../redux/actions/actions';
import style from './NavigationBar.module.css';

export default function NavigationBar({handleReload, pagination}) {
  const dispatch = useDispatch();
  const allTeams = useSelector(state => state.allTeams);
  const gFilter = useSelector(state => state.globalFilter);

  function handleGlobalFilter() {
    dispatch(globalFilter(gFilter ? false : true));
  }

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
    if(!allTeams.length)
      dispatch(getTeams());
  },[]);

  return (
      <div className={style.divNav}>
        <Link to={'/'}><img className={style.f1Logo} src='https://upload.wikimedia.org/wikipedia/commons/f/f2/New_era_F1_logo.png' alt="f1_logo" /></Link>
        <button onClick={handleGlobalFilter} className={gFilter ? style.GFButtonOn : style.GFButtonOff}>{gFilter ? 'GF' : 'LF'}</button>

        <label>FILTER BY TEAM: </label>
        <select className={style.selectTeams} name="filterByTeam" onChange={handleFilterByTeam} defaultValue={'all'}>
          <option value='all'>All Teams</option>
          {allTeams.map((team) => (
            <option value={team} key={team}>{team}</option>
          ))};
        </select>

        <label>FILTER BY SOURCE: </label>
        <select name="filterBySource" onChange={handleFilterBySource} defaultValue={'all'}>
          <option value='all'>All Sources</option>
          <option value='api'>API</option>
          <option value='db'>DB</option>
        </select>

        <label>ORDER: </label>
        <select name="order" onChange={handleOrder} defaultValue={'normal'}>
          <option value='normal' disabled>Normal</option>
          <option value='ascAz'>Ascending A-Z</option>
          <option value='desZa'>Descending Z-A</option>
          <option value='ascDob'>Ascending DoB</option>
          <option value='desDob'>Descending DoB</option>
        </select>
        
        <Link to={'/create'}><button className={style.createButton}>Create Driver</button></Link>
        <button onClick={handleReload} className={style.reloadButton} >Reload all Drivers</button>
        <SearchBar pagination={pagination} />
      </div>
  )
};
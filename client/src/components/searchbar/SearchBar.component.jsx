import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css';
import { getDriversByName } from '../../redux/actions/actions';
import { useState } from 'react';

export default function SearchBar({pagination}) {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  };
  
  function handleSubmit(event) {
    event.preventDefault();
    searchString.length > 1 ? dispatch(getDriversByName(searchString)) : null;
    setSearchString("");
    pagination(1);
  };

  return (
      <div className={style.divSearchBar}>
        <form  onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder="Type driver's forename" type='search' value={searchString} />
        <button type='submit' className={style.searchButton}>Search</button>
        </form>
      </div>
  )
};
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
    if(searchString.length === 0)
    alert('The Search Field is empty, please! type a Forename')
    else {
      (dispatch(getDriversByName(searchString)));
      pagination(1);
    }
    setSearchString("");
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
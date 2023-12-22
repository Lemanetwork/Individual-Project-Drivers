import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../validation';
import { getTeams, postDriver } from '../../redux/actions/actions';
import style from './Create.module.css';

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTeams = useSelector(state => state.allTeams);

  const [driverData, setDriverData] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: []
  });

  const [errors, setErrors] = useState({description: " "});
  
  function handleChange(event) {
    setDriverData({...driverData, [event.target.name]: event.target.value});
    setErrors(validation({...driverData, [event.target.name]: event.target.value}));
  };

  function handleSelect(event) {
    setDriverData({
      ...driverData, 
      teams: [...driverData.teams, event.target.value]
    });
    setErrors(validation({...driverData, teams: [...driverData.teams, event.target.value]}));
  };

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postDriver(driverData));
    alert(`Driver ${driverData.forename} ${driverData.surname} created successfully`);
    setDriverData({
      forename: "",
      surname: "",
      nationality: "",
      image: "",
      dob: "",
      description: "",
      teams: ""
    });
    navigate('/home');
  };
  
useEffect(()=> {
  dispatch(getTeams());
},[]);

  return (
    <div>
      <div>
        <Link to={'/home'} ><button>Back</button></Link>
        <h2>Create Drivers Form</h2>
      </div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='forename'>Forename:
          <input name='forename' value={driverData.forename} onChange={handleChange}/>
        </label>
        {errors.forename && <span>{errors.forename}</span>}
      </div>

      <div>
        <label htmlFor='surname'>Surname:
          <input name='surname' value={driverData.surname} onChange={handleChange}/>
        </label>
        {errors.surname && <span>{errors.surname}</span>}
      </div>

      <div>
        <label htmlFor='nationality'>Nationality:
          <input name='nationality' value={driverData.nationality} onChange={handleChange}/>
        </label>
        {errors.nationality && <span>{errors.nationality}</span>}
      </div>

      <div>
        <label htmlFor='image'>Image (URL):
          <input name='image' value={driverData.image} onChange={handleChange}/>
        </label>
        {errors.image && <span>{errors.image}</span>}
      </div>

      <div>
        <label htmlFor='dob'>Date of Birth:
          <input name='dob' value={driverData.dob} onChange={handleChange}/>
        </label>
        {errors.dob && <span>{errors.dob}</span>}
      </div>

      <div>
        <label htmlFor='description'>Description:
          <input name='description' value={driverData.description} onChange={handleChange}/>
        </label>
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div>
        <label htmlFor='teams'>Teams:</label>
        <select name='teams' onChange={handleSelect}>
          {allTeams.map((team) => (
            <option value={team} key={team}>{team}</option>
          ))};
        </select>
        {errors.teams && <span>{errors.teams}</span>}
        <br/>
          <span>{driverData.teams.map(team => team + ', ')}</span>
      </div>

      {errors.forename || errors.surname || errors.nationality || errors.image || errors.dob || errors.description || errors.teams ? null : <button type='submit' >Create Driver</button>}
      </form>
    </div>
  )
};
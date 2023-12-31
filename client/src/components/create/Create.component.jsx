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
  const [errors, setErrors] = useState({description: " "});

  const [driverData, setDriverData] = useState({
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: []
  });
  
  function handleChange(event) {
    setDriverData({...driverData, [event.target.name]: event.target.value});
    setErrors(validation({...driverData, [event.target.name]: event.target.value}));
  };

  function handleSelect(event) {
    const newTeam = event.target.value;
    if(!driverData.teams.includes(newTeam)) {
      setDriverData({
        ...driverData, 
        teams: [...driverData.teams, newTeam]
      });
      setErrors(validation({...driverData, teams: [...driverData.teams, newTeam]}));
    } else alert(`You already added the team ${newTeam} to the list`)
  };

  function handleRemove(remTeam) {
    const myTeams = driverData.teams.filter((team) => team !== remTeam);
    setDriverData({
      ...driverData,
      teams: [...myTeams]
    });
    setErrors(validation({...driverData, teams: [...myTeams]}));
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
    <div className={style.mainDiv}>

      <div>
        <Link to={'/home'} ><button className={style.backButton} >Back</button></Link>
        <h2>Create Driver Form</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={style.divCreate}>
          <label className={style.createLabel} htmlFor='forename'>Forename:
            <input className={style.createInput} name='forename' value={driverData.forename} onChange={handleChange}/>
          </label>
          {driverData.forename.length > 0 && errors.forename && <span>{errors.forename}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='surname'>Surname:
            <input className={style.createInput} name='surname' value={driverData.surname} onChange={handleChange}/>
          </label>
          {driverData.surname.length > 0 && errors.surname && <span>{errors.surname}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='nationality'>Nationality:
            <input className={style.createInput} name='nationality' value={driverData.nationality} onChange={handleChange}/>
          </label>
          {driverData.nationality.length > 0 && errors.nationality && <span>{errors.nationality}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='image'>Image (URL):
            <input className={style.createInput} name='image' value={driverData.image} onChange={handleChange}/>
          </label>
          {driverData.image.length > 0 && errors.image && <span>{errors.image}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='dob'>Date of Birth:
            <input className={style.createInput} name='dob' value={driverData.dob} onChange={handleChange}/>
          </label>
          {driverData.dob.length > 0 && errors.dob && <span>{errors.dob}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='description'>Description:
            <textarea className={style.createTextarea} name='description' value={driverData.description} onChange={handleChange} placeholder='Type the description here...' ></textarea>
          </label>
          {driverData.description.length > 0 && errors.description && <span>{errors.description}</span>}
        </div>

        <div className={style.divCreate}>
          <label  className={style.createLabel} htmlFor='teams'>Teams:</label>
          <select className={style.createSelect} name='teams' onChange={handleSelect}>
            {allTeams.map((team) => (
              <option value={team} key={team}>{team}</option>
            ))};
          </select>
          <br/>
          {errors.forename || errors.surname || errors.nationality || errors.image || errors.dob || errors.description ? null : errors.teams && <span>{errors.teams}</span>}
          <br/>
            {/* <span className={style.teamsSpan}>{driverData.teams.map(team => team + ', ')}</span> */}
            {driverData.teams.map(myTeam => (<span className={style.teamsSpan} onClick={()=> handleRemove(myTeam)} key={myTeam}>{driverData.teams.length < 2 ? myTeam : `${myTeam}, ` }</span>))}
        </div>

        {errors.forename || errors.surname || errors.nationality || errors.image || errors.dob || errors.description || errors.teams ? null : <button className={style.createDriver} type='submit' >Create Driver</button>}
      </form>
    </div>
  )
};
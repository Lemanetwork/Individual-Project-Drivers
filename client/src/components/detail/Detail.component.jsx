import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getDriverDetailById } from '../../redux/actions/actions';
import style from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.backupDrivers);
  const navigate = useNavigate();  
  
  function handleButton() {
    navigate('/home');
  }

  useEffect(()=>{
    dispatch(getDriverDetailById(id));
  }, []);
  
  return (
      <div>
        <button style={style.backButton} onClick={handleButton}>Back</button>
        <h2>{`${driver.forename} ${driver.surname}`}</h2>
        <p>{driver.nationality}</p>
        <p>{driver.dob}</p>
         <img className={style.imgDetail} src={driver.image} alt={driver.forename} />
         <p>{driver.teams}</p>
         <p>{driver.description}</p>
        <p>{driver.id}</p>
      </div>
  )
};
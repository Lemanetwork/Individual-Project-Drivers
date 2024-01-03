import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { clearDetail, deleteDriver, getAllDrivers, getDriverDetailById } from '../../redux/actions/actions';
import style from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.driverDetail);
  const navigate = useNavigate();

  function handleDelete() {
    dispatch(deleteDriver(id));
    navigate("/home")
    dispatch(getAllDrivers());
    alert(`The Driver was deleted successfully`);
  };

  useEffect(()=>{
    dispatch(getDriverDetailById(id));
    dispatch(clearDetail());
  }, []);
  
  return (
    <div className={style.divDetail}>
        <Link to={'/home'}><button className={style.backButton} >Back</button></Link>
        {isNaN(id) ? <button onClick={handleDelete} className={style.deleteDriver} >Delete Driver</button> : null}
        <h2>{`${driver.forename} ${driver.surname}`}</h2>
        <p className={style.pNationality}>{driver.nationality}</p>
        <p>{driver.dob}</p>
         <img className={style.imgDetail} src={driver.image} alt={driver.forename} />
         <p>{driver.teams}</p>
         <p>{driver.description}</p>
        <p>{driver.id}</p>
      </div>
  );
};
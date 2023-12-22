import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();  
  
  function handleClick() {
    navigate('/home');
  };

  return (
      <div className={style.divLanding}>
        <button className={style.landingButton} onClick={handleClick} >Welcome to Drivers</button>
      </div>
  )
};
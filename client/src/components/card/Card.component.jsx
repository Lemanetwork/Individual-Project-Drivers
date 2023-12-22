import style from './Card.module.css';
import { Link } from 'react-router-dom'

export default function Card({driver}) {
  const {id, forename, surname, teams, image} = driver;
  return (
      <div className={style.divCard}>
        <Link to={`/detail/${id}`} ><h3 className={style.h3Link}  >{`${forename} ${surname}`}</h3></Link>
        <img className={style.imgCard} src={image} alt={forename} />
        <p className={style.pTeams}>{teams}</p>
      </div>
  )
};
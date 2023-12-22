import Card from '../card/Card.component';
import style from './Cards.module.css';

export default function Cards({currentDrivers}) {
  return (
      <div className={style.divCards}>
        {currentDrivers?.map(driver => <Card driver={driver} key={driver.id} />)}
      </div>
  )
};
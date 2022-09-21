import Image from 'next/image';
import { PokemonType } from '../../store/usePokemonStore';
import styles from './Card.module.css';

const Card = ({ name, image }: PokemonType) => {
  return (
    <div className={styles.image}>
      <Image alt={name} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`} width={200} height={200} />
      <h2>{name}</h2>
    </div>
  );
};

export default Card;

import Image from 'next/image';
import Link from 'next/link';
import { PokemonType } from '../../types';
import styles from './Card.module.css';

const Card = ({ id, name, image }: PokemonType) => {
  return (
    <article className={styles.image}>
      <Link href={`/${id}`}>
        <a>
          <Image
            alt={name}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`}
            width={200}
            height={200}
          />
        </a>
      </Link>
      <h2>{name}</h2>
    </article>
  );
};

export default Card;

import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonType } from '../types';
import { usePokemonsStore } from '../store/usePokemonsStore';
import { usePokemonStore } from '../store/usePokemonStore';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  if (!usePokemonsStore.getState().pokemons) {
    console.log('fetch');
    await usePokemonsStore.getState().fetchPokemons();
  }

  const pokemons = usePokemonsStore.getState().pokemons;
  const foundPokemon = pokemons?.find((item) => item.id === Number(id));
  if (!foundPokemon) {
    return {
      notFound: true,
    };
  }

  usePokemonStore.getState().setPokemon(foundPokemon);

  return {
    props: {
      propsPokemon: usePokemonStore.getState().pokemon,
    },
  };
};

const PokemonPage = ({ propsPokemon }: { propsPokemon: PokemonType }) => {
  const { pokemon, setPokemon, removePokemon } = usePokemonStore();

  useEffect(() => {
    setPokemon(propsPokemon);

    return () => {
      removePokemon();
    };
  }, [propsPokemon, removePokemon, setPokemon]);

  return (
    <div className={styles.main}>
      <div>
        <Link href="/">⬅️ Go back</Link>
      </div>
      <div className={styles.imgWrap}>
        <Image
          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image ?? propsPokemon.image}`}
          alt={pokemon?.name ?? propsPokemon.name}
          width={400}
          height={400}
        />
      </div>
      <h1>{pokemon?.name ?? propsPokemon.name}</h1>
    </div>
  );
};

export default PokemonPage;

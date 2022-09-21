import React, { useEffect, useState, useTransition } from 'react';
import { PokemonType } from '../types';
import { usePokemonsStore } from '../store/usePokemonsStore';
import Cards from '../components/Cards';
import styles from '../styles/Home.module.css';

export const getServerSideProps = async () => {
  await usePokemonsStore.getState().fetchPokemons();

  return {
    props: {
      pokemons: usePokemonsStore.getState().pokemons,
    },
  };
};

const Home = ({ pokemons }: { pokemons: PokemonType[] }) => {
  const [isLoading, startTransition] = useTransition();
  const [localValueFilter, setLocalValueFilter] = useState<string>('');
  const { setFilter, setPokemons, removePokemons } = usePokemonsStore();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValueFilter(e.target.value);
    startTransition(() => {
      setFilter(e.target.value);
    });
  };

  useEffect(() => {
    setPokemons(pokemons);

    return () => {
      removePokemons();
    };
  }, [pokemons, setPokemons, removePokemons]);

  return (
    <div className={styles.main}>
      <div>
        <input type="text" value={localValueFilter} onChange={changeHandler} className={styles.search} />
      </div>
      <div className={styles.container}>{isLoading ? <p>Loading...</p> : <Cards list={pokemons} />}</div>
    </div>
  );
};

export default Home;

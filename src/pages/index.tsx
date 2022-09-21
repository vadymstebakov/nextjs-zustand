import React, { useEffect, useState, useTransition } from 'react';
import { usePokemonStore, PokemonType } from '../store/usePokemonStore';
import Cards from '../components/Cards';
import styles from '../styles/Home.module.css';

export const getServerSideProps = async () => {
  await usePokemonStore.getState().fetchPokemon();

  return {
    props: {
      pokemon: usePokemonStore.getState().pokemon,
    },
  };
};

const Home = ({ pokemon }: { pokemon: PokemonType[] }) => {
  const [isLoading, startTransition] = useTransition();
  const [localValueFilter, setLocalValueFilter] = useState<string>('');
  const { setFilter, setPokemon } = usePokemonStore();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValueFilter(e.target.value);
    startTransition(() => {
      setFilter(e.target.value);
    });
  };

  useEffect(() => {
    setPokemon(pokemon);
  }, [pokemon, setPokemon]);

  return (
    <div className={styles.main}>
      <div>
        <input type="text" value={localValueFilter} onChange={changeHandler} className={styles.search} />
      </div>
      <div className={styles.container}>{isLoading ? <p>Loading...</p> : <Cards list={pokemon} />}</div>
    </div>
  );
};

export default Home;

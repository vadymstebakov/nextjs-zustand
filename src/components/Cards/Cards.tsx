import { memo } from 'react';
import { PokemonType } from '../../types';
import { usePokemonsStore } from '../../store/usePokemonsStore';
import Card from '../Card';

const Cards = ({ list }: { list: PokemonType[] }) => {
  const { filteredPokemons, setPokemons } = usePokemonsStore();

  if (filteredPokemons) {
    return (
      <>
        {filteredPokemons.map((item) => (
          <Card key={item.id} id={item.id} name={item.name} image={item.image} />
        ))}
      </>
    );
  }

  return (
    <>
      {list.map((item) => (
        <Card key={item.id} id={item.id} name={item.name} image={item.image} />
      ))}
    </>
  );
};

export default memo(Cards);

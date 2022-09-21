import { memo } from 'react';
import { usePokemonStore, PokemonType } from '../../store/usePokemonStore';
import Card from '../Card';

const Cards = ({ list }: { list: PokemonType[] }) => {
  const { filteredPokemon, setPokemon } = usePokemonStore();

  if (filteredPokemon) {
    return (
      <>
        {filteredPokemon.map((item) => (
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

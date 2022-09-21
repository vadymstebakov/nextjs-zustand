import create, { StateCreator, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';

export type PokemonType = {
  id: number;
  name: string;
  image: string;
};

type InitialStateType = {
  pokemon: PokemonType[] | null;
  filteredPokemon: PokemonType[] | null;
  filter: string;
};

type ActionsType = {
  fetchPokemon: () => void;
  setPokemon: (pokemon: PokemonType[]) => void;
  setFilter: (filter: string) => void;
};

type StoreType = InitialStateType & ActionsType;

const devtoolsOptions = { name: 'pokemon-store', serialize: { options: true } };
const middlewares = (fn: any) => (process.env.NODE_ENV === 'development' ? devtools(fn, devtoolsOptions) : fn);
const initialState: InitialStateType = {
  pokemon: null,
  filteredPokemon: null,
  filter: '',
};
const createStore: StateCreator<StoreType, [['zustand/devtools', never]], []> = (set) => {
  return {
    ...initialState,
    fetchPokemon: async () => {
      const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
      const data = await res.json();

      set({ pokemon: data, filteredPokemon: data }, false, {
        type: 'pokemon/fetchPokemon',
      });
    },
    setPokemon: (pokemon: PokemonType[]) => {
      set({ pokemon, filteredPokemon: pokemon }, false, {
        type: 'pokemon/setPokemon',
        payload: { pokemon },
      });
    },
    setFilter: (filter: string) => {
      set(
        (state: InitialStateType) => {
          return {
            filter,
            filteredPokemon: state.pokemon?.filter((pokemon: PokemonType) =>
              pokemon.name.toLowerCase().includes(filter.toLowerCase())
            ),
          };
        },
        false,
        {
          type: 'pokemon/setFilter',
          payload: { filter },
        }
      );
    },
  };
};

export const usePokemonStore = create<StoreType>()(middlewares(createStore));

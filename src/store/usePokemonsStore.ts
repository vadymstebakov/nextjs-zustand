import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PokemonType } from '../types';

type InitialStateType = {
  pokemons: PokemonType[] | null;
  filteredPokemons: PokemonType[] | null;
  filter: string;
};

type ActionsType = {
  fetchPokemons: () => void;
  setPokemons: (pokemon: PokemonType[]) => void;
  setFilter: (filter: string) => void;
  removePokemons: () => void;
};

type StoreType = InitialStateType & ActionsType;

const devtoolsOptions = { name: 'pokemons-store', serialize: { options: true } };
const middlewares = (fn: any) => (process.env.NODE_ENV === 'development' ? devtools(fn, devtoolsOptions) : fn);
const initialState: InitialStateType = {
  pokemons: null,
  filteredPokemons: null,
  filter: '',
};
const createStore: StateCreator<StoreType, [['zustand/devtools', never]], []> = (set) => {
  return {
    ...initialState,
    async fetchPokemons() {
      const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
      const data = await res.json();

      set({ pokemons: data, filteredPokemons: data }, false, {
        type: 'pokemons/fetchPokemons',
      });
    },
    setPokemons(pokemons: PokemonType[]) {
      set({ pokemons, filteredPokemons: pokemons }, false, {
        type: 'pokemons/setPokemons',
        payload: { pokemons },
      });
    },
    setFilter(filter: string) {
      set(
        (state: InitialStateType) => {
          return {
            filter,
            filteredPokemons: state.pokemons?.filter((pokemon: PokemonType) =>
              pokemon.name.toLowerCase().includes(filter.toLowerCase())
            ),
          };
        },
        false,
        {
          type: 'pokemons/setFilter',
          payload: { filter },
        }
      );
    },
    removePokemons() {
      set(initialState, false, {
        type: 'pokemons/removePokemons',
      });
    },
  };
};

export const usePokemonsStore = create<StoreType>()(middlewares(createStore));

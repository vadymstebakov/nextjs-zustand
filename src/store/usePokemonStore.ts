import create, { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PokemonType } from '../types';

type InitialStateType = {
  pokemon: PokemonType | null;
};

type ActionsType = {
  setPokemon: (pokemon: PokemonType) => void;
  removePokemon: () => void;
};

type StoreType = InitialStateType & ActionsType;

const devtoolsOptions = { name: 'pokemon-store', serialize: { options: true } };
const middlewares = (fn: any) => (process.env.NODE_ENV === 'development' ? devtools(fn, devtoolsOptions) : fn);
const initialState: InitialStateType = {
  pokemon: null,
};
const createStore: StateCreator<StoreType, [['zustand/devtools', never]], []> = (set) => {
  return {
    ...initialState,
    setPokemon(pokemon: PokemonType) {
      set({ pokemon }, false, {
        type: 'pokemon/setPokemon',
        payload: { pokemon },
      });
    },
    removePokemon() {
      set(initialState, false, {
        type: 'pokemon/removePokemon',
      });
    },
  };
};

export const usePokemonStore = create<StoreType>()(middlewares(createStore));

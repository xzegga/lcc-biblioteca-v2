/* eslint-disable no-shadow */
import { create } from 'zustand';

export type StoreReturnType<T> = T & {
  setState: (newState: Partial<T>) => void;
};

export function createStore<Store>(initialState: Store) {
  const state = initialState;
  return create<StoreReturnType<Store>>((set) => ({
    ...state,
    setState: (newState: Partial<Store>) => {
      set((st) => ({ ...st, ...newState }));
    },
  }));
}

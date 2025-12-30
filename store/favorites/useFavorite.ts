import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


type FavoritesState = {
  favorites: string[];
  addFavorite: (wordFavorite: string) => void;
  removeFavorite: (wordFavorite: string) => void;
  removeAllFavorites: () => void;
  toggleFavorite: (wordFavorite: string) => void;
  isFavorite: (wordFavorite: string | undefined) => boolean;
};


export const useFavorite = create<FavoritesState>()(
    devtools(
        persist(
            (set, get) => ({
        favorites: [],

        addFavorite: (wordFavorite) => 
            set((prevState) => ({ favorites: [...prevState.favorites, wordFavorite] })),

        removeFavorite: (wordFavorite) => 
            set((prevState) => ({
                favorites: prevState.favorites.filter(word => word !== wordFavorite),
            })),
        removeAllFavorites: () => 
            set(() => ({
                favorites: []
            })),
        toggleFavorite: (wordFavorite) => {
            const exists = get().favorites.find(word => word === wordFavorite);

            exists ? get().removeFavorite(wordFavorite) : get().addFavorite(wordFavorite);
        },

        isFavorite: (wordFavorite) => get().favorites.some(word => word === wordFavorite),
    }), {
            name: "favorites-storage"
        })
    )
);

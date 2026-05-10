import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FavoritePokemonContextType = {
  favorites: string[];
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

const FavoritePokemonContext =
  createContext({} as FavoritePokemonContextType);

export function FavoritePokemonProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storageFavorites = localStorage.getItem(
      "@pokemon:favorites"
    );

    if (storageFavorites) {
      setFavorites(JSON.parse(storageFavorites));
    }
  }, []);

  function toggleFavorite(name: string) {
    let updatedFavorites: string[];

    if (favorites.includes(name)) {
      updatedFavorites = favorites.filter(
        (pokemonName) => pokemonName !== name
      );
    } else {
      updatedFavorites = [...favorites, name];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "@pokemon:favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  function isFavorite(name: string) {
    return favorites.includes(name);
  }

  return (
    <FavoritePokemonContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritePokemonContext.Provider>
  );
}

export function useFavoritePokemon() {
  return useContext(FavoritePokemonContext);
}
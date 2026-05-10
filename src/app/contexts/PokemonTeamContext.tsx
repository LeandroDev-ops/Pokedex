import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Pokemon = {
  name: string;
  image: string;
  nickname?: string;
  note?: string;
};

type PokemonTeamContextType = {
  team: Pokemon[];

  addPokemon: (pokemon: Pokemon) => void;

  removePokemon: (name: string) => void;

  updatePokemon: (
    name: string,
    nickname: string,
    note: string
  ) => void;
};

const PokemonTeamContext =
  createContext({} as PokemonTeamContextType);

export function PokemonTeamProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [team, setTeam] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storageTeam = localStorage.getItem(
      "@pokemon:team"
    );

    if (storageTeam) {
      setTeam(JSON.parse(storageTeam));
    }
  }, []);

  function addPokemon(pokemon: Pokemon) {
    if (team.length >= 6) {
      alert("Seu time já possui 6 Pokémon.");

      return;
    }

    const pokemonAlreadyExists = team.find(
      (item) => item.name === pokemon.name
    );

    if (pokemonAlreadyExists) {
      alert("Esse Pokémon já está no time.");

      return;
    }

    const updatedTeam = [...team, pokemon];

    setTeam(updatedTeam);

    localStorage.setItem(
      "@pokemon:team",
      JSON.stringify(updatedTeam)
    );
  }

  function removePokemon(name: string) {
    const updatedTeam = team.filter(
      (pokemon) => pokemon.name !== name
    );

    setTeam(updatedTeam);

    localStorage.setItem(
      "@pokemon:team",
      JSON.stringify(updatedTeam)
    );
  }

  function updatePokemon(
    name: string,
    nickname: string,
    note: string
  ) {
    const updatedTeam = team.map((pokemon) => {
      if (pokemon.name === name) {
        return {
          ...pokemon,
          nickname,
          note,
        };
      }

      return pokemon;
    });

    setTeam(updatedTeam);

    localStorage.setItem(
      "@pokemon:team",
      JSON.stringify(updatedTeam)
    );
  }

  return (
    <PokemonTeamContext.Provider
      value={{
        team,
        addPokemon,
        removePokemon,
        updatePokemon,
      }}
    >
      {children}
    </PokemonTeamContext.Provider>
  );
}

export function usePokemonTeam() {
  return useContext(PokemonTeamContext);
}
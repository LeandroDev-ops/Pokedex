import { useEffect, useState } from "react";

import {
  getPokemons,
  getPokemonDetails,
} from "../../app/services/pokemonApi";

import { usePokemonTeam } from "../../app/contexts/PokemonTeamContext";

import { useFavoritePokemon } from "../../app/contexts/FavoritePokemonContext";

import Navbar from "../../app/components/Navbar";

export default function PokedexPage() {
  const { addPokemon } = usePokemonTeam();

  const { toggleFavorite, isFavorite } =
    useFavoritePokemon();

  const [pokemons, setPokemons] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("id-asc");

  const [showFavoritesOnly, setShowFavoritesOnly] =
    useState(false);

  const [selectedPokemon, setSelectedPokemon] =
    useState<any>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const limit = 20;

  const spinnerStyle = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `;

  const pokemonTypeColors: any = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
  };

  useEffect(() => {
    async function loadPokemons() {
      try {
        setLoading(true);
        setError("");

        const offset = (page - 1) * limit;

        const response = await getPokemons(
          limit,
          offset
        );

        setPokemons(response.results);
      } catch (error) {
        setError(
          "Não foi possível carregar os Pokémons. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, [page]);

  const filteredPokemons = pokemons
    .filter((pokemon: any) =>
      pokemon.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((pokemon: any) => {
      if (!showFavoritesOnly) {
        return true;
      }

      return isFavorite(pokemon.name);
    })
    .sort((a: any, b: any) => {
      const aId =
        pokemons.indexOf(a) + 1 + (page - 1) * limit;

      const bId =
        pokemons.indexOf(b) + 1 + (page - 1) * limit;

      switch (sortBy) {
        case "az":
          return a.name.localeCompare(b.name);

        case "za":
          return b.name.localeCompare(a.name);

        case "id-desc":
          return bId - aId;

        default:
          return aId - bId;
      }
    });

  async function handleOpenPokemon(name: string) {
    try {
      const pokemonDetails =
        await getPokemonDetails(name);

      setSelectedPokemon(pokemonDetails);

      setIsModalOpen(true);
    } catch (error) {
      alert(
        "Não foi possível carregar os detalhes do Pokémon."
      );
    }
  }

  return (
    <div>
      <style>{spinnerStyle}</style>

      <Navbar />

      <div
        style={{
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "12px",
          }}
        >
          <button
            onClick={() =>
              setShowFavoritesOnly(!showFavoritesOnly)
            }
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: showFavoritesOnly
                ? "#ff4d6d"
                : "#333",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {showFavoritesOnly
              ? "Mostrando favoritos ❤️"
              : "Mostrar favoritos 🤍"}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <option value="id-asc">
              Número crescente
            </option>

            <option value="id-desc">
              Número decrescente
            </option>

            <option value="az">A-Z</option>

            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor:
              page === 1 ? "not-allowed" : "pointer",
            backgroundColor:
              page === 1 ? "#999" : "#333",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          ⬅ Anterior
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Página {page}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Próxima ➡
        </button>
      </div>

      {error && (
        <div
          style={{
            margin: "20px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffe5e5",
            color: "#b00020",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "6px solid #e5e5e5",
              borderTop: "6px solid #ff1c1c",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />

          <h2>Carregando Pokémons...</h2>
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {filteredPokemons.map((pokemon: any, index: number) => (
            <div
              key={pokemon.name}
              onClick={() => handleOpenPokemon(pokemon.name)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
              style={{
                position: "relative",
                border: "1px solid #e5e5e5",
                borderRadius: "16px",
                padding: "16px",
                textAlign: "center",
                backgroundColor: "#fff",
                transition: "0.2s",
                cursor: "pointer",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();

                  toggleFavorite(pokemon.name);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                {isFavorite(pokemon.name)
                  ? "❤️"
                  : "🤍"}
              </button>

              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  (page - 1) * limit + index + 1
                }.png`}
                alt={pokemon.name}
                style={{
                  width: "120px",
                  height: "120px",
                }}
              />

              <p
                style={{
                  fontWeight: "bold",
                  color: "#777",
                  marginBottom: "4px",
                }}
              >
                #{(page - 1) * limit + index + 1}
              </p>

              <p
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginTop: 0,
                }}
              >
                {pokemon.name}
              </p>

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  addPokemon({
                    name: pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      (page - 1) * limit +
                      index +
                      1
                    }.png`,
                  });
                }}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Adicionar ao time
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedPokemon && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "350px",
              maxHeight: "90vh",
              overflowY: "auto",
              background:
                pokemonTypeColors[
                  selectedPokemon.types[0].type.name
                ] || "#fff",
              color: "#fff",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                float: "right",
                border: "none",
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <img
              src={
                selectedPokemon.sprites.other[
                  "official-artwork"
                ].front_default
              }
              alt={selectedPokemon.name}
              style={{
                width: "180px",
                height: "180px",
              }}
            />

            <h2 style={{ textTransform: "capitalize" }}>
              {selectedPokemon.name}
            </h2>

            <p>
              <strong>ID:</strong> #{selectedPokemon.id}
            </p>

            <p>
              <strong>Altura:</strong>{" "}
              {selectedPokemon.height}
            </p>

            <p>
              <strong>Peso:</strong>{" "}
              {selectedPokemon.weight}
            </p>

            <div style={{ marginTop: "10px" }}>
              <strong>Tipos:</strong>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginTop: "10px",
                  flexWrap: "wrap",
                }}
              >
                {selectedPokemon.types.map((item: any) => (
                  <span
                    key={item.type.name}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor:
                        pokemonTypeColors[
                          item.type.name
                        ] || "#777",
                      border:
                        "1px solid rgba(255,255,255,0.5)",
                    }}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              <h3>Status</h3>

              {selectedPokemon.stats.map((item: any) => (
                <div
                  key={item.stat.name}
                  style={{ marginBottom: "10px" }}
                >
                  <strong
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {item.stat.name}:
                  </strong>{" "}
                  {item.base_stat}

                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor:
                        "rgba(255,255,255,0.3)",
                      borderRadius: "8px",
                      marginTop: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(
                          item.base_stat,
                          100
                        )}%`,
                        height: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
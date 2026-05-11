import { useEffect, useState } from "react";

import {
  getPokemons,
  getPokemonDetails,
} from "../../app/services/pokemonApi";

import { usePokemonTeam } from "../../app/contexts/PokemonTeamContext";

import { useFavoritePokemon } from "../../app/contexts/FavoritePokemonContext";

import Navbar from "../../app/components/Navbar";

export default function PokedexPage() {
  const { addPokemon, team } = usePokemonTeam();

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

  function isCaptured(name: string) {
    return team.some(
      (pokemon) => pokemon.name === name
    );
  }

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
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
      }}
    >
      <style>{spinnerStyle}</style>

      <Navbar />

      <section
        style={{
          padding: "40px 20px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            color: "#1f2937",
          }}
        >
          Pokédex
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          Explore, favorite e capture seus Pokémons favoritos.
        </p>
      </section>

      <div
        style={{
          margin: "0 auto 24px",
          padding: "20px",
          maxWidth: "1100px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid #d1d5db",
            fontSize: "16px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "16px",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() =>
              setShowFavoritesOnly(!showFavoritesOnly)
            }
            style={{
              padding: "12px 18px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              backgroundColor: showFavoritesOnly
                ? "#ff4d6d"
                : "#111827",
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
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#fff",
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
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "999px",
            cursor:
              page === 1 ? "not-allowed" : "pointer",
            backgroundColor:
              page === 1 ? "#9ca3af" : "#111827",
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
            backgroundColor: "#fff",
            padding: "0 18px",
            borderRadius: "999px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          Página {page}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            backgroundColor: "#111827",
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
            margin: "20px auto",
            maxWidth: "900px",
            padding: "20px",
            borderRadius: "14px",
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
              borderTop: "6px solid #ef4444",
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
              "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "24px",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {filteredPokemons.map((pokemon: any, index: number) => (
            <div
              key={pokemon.name}
              onClick={() => handleOpenPokemon(pokemon.name)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0) scale(1)";
              }}
              style={{
                position: "relative",
                border: "1px solid #e5e7eb",
                borderRadius: "22px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                transition: "0.25s",
                cursor: "pointer",
                boxShadow:
                  "0 12px 24px rgba(0,0,0,0.08)",
              }}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();

                  toggleFavorite(pokemon.name);
                }}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  border: "none",
                  backgroundColor: "#f9fafb",
                  fontSize: "22px",
                  cursor: "pointer",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {isFavorite(pokemon.name)
                  ? "❤️"
                  : "🤍"}
              </button>

              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #fef3c7, #fee2e2)",
                  margin: "10px auto 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
              </div>

              <p
                style={{
                  fontWeight: "bold",
                  color: "#9ca3af",
                  marginBottom: "4px",
                }}
              >
                #{(page - 1) * limit + index + 1}
              </p>

              <p
                style={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: 0,
                  color: "#111827",
                }}
              >
                {pokemon.name}
              </p>

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  if (isCaptured(pokemon.name)) {
                    return;
                  }

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
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: isCaptured(pokemon.name)
                    ? "default"
                    : "pointer",
                  backgroundColor: isCaptured(pokemon.name)
                    ? "#ef4444"
                    : "#22c55e",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                  opacity: isCaptured(pokemon.name)
                    ? 0.95
                    : 1,
                }}
              >
                {isCaptured(pokemon.name)
                  ? "Capturado ❤️"
                  : "Capturar"}
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
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "20px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "380px",
              maxHeight: "90vh",
              overflowY: "auto",
              background:
                pokemonTypeColors[
                  selectedPokemon.types[0].type.name
                ] || "#fff",
              color: "#fff",
              borderRadius: "24px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                float: "right",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
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
                width: "190px",
                height: "190px",
              }}
            />

            <h2
              style={{
                textTransform: "capitalize",
                fontSize: "30px",
                marginBottom: "8px",
              }}
            >
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

            <div style={{ marginTop: "14px" }}>
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
                      padding: "7px 14px",
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
                marginTop: "22px",
                textAlign: "left",
              }}
            >
              <h3>Status</h3>

              {selectedPokemon.stats.map((item: any) => (
                <div
                  key={item.stat.name}
                  style={{ marginBottom: "12px" }}
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
                      height: "9px",
                      backgroundColor:
                        "rgba(255,255,255,0.3)",
                      borderRadius: "999px",
                      marginTop: "5px",
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
                        borderRadius: "999px",
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

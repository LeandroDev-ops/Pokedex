import { usePokemonTeam } from "../../app/contexts/PokemonTeamContext";

export default function TeamPage() {
  const {
    team,
    removePokemon,
    updatePokemon,
  } = usePokemonTeam();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Meu Time Pokémon</h1>

      <p
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        {team.length} / 6 Pokémon
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
            window.location.href = "/pokedex";
          }}
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
          Voltar para Pokédex
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("@pokemon:team");

            window.location.reload();
          }}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Limpar Time
        </button>
      </div>

      {team.length === 0 && (
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Seu time está vazio.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {team.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{
                width: "120px",
                height: "120px",
              }}
            />

            <h3
              style={{
                textTransform: "capitalize",
              }}
            >
              {pokemon.name}
            </h3>

            <input
              type="text"
              placeholder="Apelido"
              defaultValue={pokemon.nickname}
              id={`nickname-${pokemon.name}`}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />

            <textarea
              placeholder="Anotações"
              defaultValue={pokemon.note}
              id={`note-${pokemon.name}`}
              style={{
                width: "100%",
                minHeight: "80px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "none",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => {
                  const nicknameInput =
                    document.getElementById(
                      `nickname-${pokemon.name}`
                    ) as HTMLInputElement;

                  const noteInput =
                    document.getElementById(
                      `note-${pokemon.name}`
                    ) as HTMLTextAreaElement;

                  updatePokemon(
                    pokemon.name,
                    nicknameInput.value,
                    noteInput.value
                  );

                  alert("Pokémon atualizado!");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Salvar
              </button>

              <button
                onClick={() =>
                  removePokemon(pokemon.name)
                }
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
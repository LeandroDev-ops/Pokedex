import { useAuth } from "../contexts/AuthContext";
import { usePokemonTeam } from "../contexts/PokemonTeamContext";

export default function Navbar() {
  const { logout } = useAuth();
  const { team } = usePokemonTeam();

  return (
    <div
      style={{
        width: "100%",
        padding: "16px 20px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ margin: 0 }}>Pokédex App</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            window.location.href = "/pokedex";
          }}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Pokédex
        </button>

        <button
          onClick={() => {
            window.location.href = "/team";
          }}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Time ({team.length}/6)
        </button>

        <button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
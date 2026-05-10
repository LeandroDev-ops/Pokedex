import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../app/contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const success = login(email, password);

    if (!success) {
      alert("E-mail ou senha inválidos!");
      return;
    }

    navigate("/pokedex");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #facc15 100%)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "34px",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(239,68,68,0.4)",
            }}
          >
            ⚡
          </div>

          <h1 style={{ margin: 0, color: "#222" }}>
            Bem-vindo
          </h1>

          <p style={{ color: "#666", marginTop: "8px" }}>
            Entre para acessar sua Pokédex
          </p>
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: "#ef4444",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            padding: "14px",
            border: "1px solid #ef4444",
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#ef4444",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../app/contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    register({
      name,
      email,
      password,
    });

    alert("Usuário cadastrado com sucesso!");

    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleRegister}
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
              backgroundColor: "#6366f1",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "34px",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(99,102,241,0.4)",
            }}
          >
            🧩
          </div>

          <h1 style={{ margin: 0, color: "#222" }}>
            Criar Conta
          </h1>

          <p style={{ color: "#666", marginTop: "8px" }}>
            Cadastre-se para montar seu time Pokémon
          </p>
        </div>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
          }}
        />

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
            backgroundColor: "#6366f1",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Cadastrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            padding: "14px",
            border: "1px solid #6366f1",
            borderRadius: "12px",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#6366f1",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Voltar para login
        </button>
      </form>
    </div>
  );
}

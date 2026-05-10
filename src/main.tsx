import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./app/router/AppRouter";

import { AuthProvider } from "./app/contexts/AuthContext";

import { PokemonTeamProvider } from "./app/contexts/PokemonTeamContext";

import { FavoritePokemonProvider } from "./app/contexts/FavoritePokemonContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AuthProvider>
      <PokemonTeamProvider>
        <FavoritePokemonProvider>
          <AppRouter />
        </FavoritePokemonProvider>
      </PokemonTeamProvider>
    </AuthProvider>
  </React.StrictMode>
);
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../../pages/Login";
import RegisterPage from "../../pages/Register";
import PokedexPage from "../../pages/Pokedex";
import TeamPage from "../../pages/Team";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rotas públicas (não logado) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Rotas privadas (logado) */}
        <Route
          path="/pokedex"
          element={
            <PrivateRoute>
              <PokedexPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/team"
          element={
            <PrivateRoute>
              <TeamPage />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
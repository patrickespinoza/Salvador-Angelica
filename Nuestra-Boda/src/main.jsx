import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Portada from "./componentes-encabezado/portada";
import PaginaPrincipal from "./PaginaPrincipal";
import Generador from "./pages/Generador";
import Reconfirmacion from "./pages/Reconfirmacion";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <Routes>
      {/* INVITACIÓN PRINCIPAL */}

      <Route
        path="/"
        element={
          <>
            <Portada />
            <PaginaPrincipal />
          </>
        }
      />

      {/* GENERADOR */}

      <Route
        path="/generador"
        element={<Generador />}
      />

      {/* RECONFIRMACIÓN */}

      <Route
        path="/reconfirmacion"
        element={<Reconfirmacion />}
      />
    </Routes>
  </BrowserRouter>
);
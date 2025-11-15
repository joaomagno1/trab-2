import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./services/router/Router";

// Cria o roteador com base no nosso mapa de rotas
const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      {/* O RouterProvider é quem vai gerenciar
          o estado da URL e renderizar os componentes */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
import { Link, Outlet } from "react-router-dom";
import "./layout.css";
import { DASHBOARD, ROUTES } from "../../services/router/url";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to={DASHBOARD}>Painel de Controle</Link>
        <Link to={ROUTES.DISCIPLINE.LIST}>Disciplina</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>Study Chunks</b>
          </div>
          <div className="user-info">
            <span className="username">
              <b>Usuário</b>
            </span>
            <a href="#" className="btn btn-logout">
              Sair
            </a>
          </div>
        </header>
        <main>
          {/*         O <Outlet> é a parte mais legal do react-router-dom.
            Esse Layout é o "pai" e o Outlet é onde o router vai
            renderizar as rotas "filhas" (List, Create, Update...).
          */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
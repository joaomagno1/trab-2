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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

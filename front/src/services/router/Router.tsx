import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import ListDiscipline from "../../views/discipline/List";
import CreateDiscipline from "../../views/discipline/Create";
import UpdateDiscipline from "../../views/discipline/Update";
import DeleteDiscipline from "../../views/discipline/Delete";
import ViewDiscipline from "../../views/discipline/View";
import { ROUTES } from "./url";

// Aqui é o "mapa" do site.
// Todas as rotas do front-end são definidas aqui.
export const routes: RouteObject[] = [
  {
    path: "/system",
    element: <Layout />, // O Layout é o elemento "pai"
    children: [
      // E essas são as "filhas" que aparecem no <Outlet>
      {
        path: "/system/dashboard",
        element: <Dashboard />,
      },
      {
        path: ROUTES.DISCIPLINE.LIST,
        element: <ListDiscipline />,
      },
      {
        path: ROUTES.DISCIPLINE.CREATE,
        element: <CreateDiscipline />,
      },
      {
        path: `${ROUTES.DISCIPLINE.UPDATE}/:idDiscipline`, // Rota com parâmetro
        element: <UpdateDiscipline />,
      },
      {
        path: `${ROUTES.DISCIPLINE.DELETE}/:idDiscipline`, // Rota com parâmetro
        element: <DeleteDiscipline />,
      },
      {
        path: `${ROUTES.DISCIPLINE.BY_ID}/:idDiscipline`, // Rota com parâmetro
        element: <ViewDiscipline />,
      },
    ],
  },
];
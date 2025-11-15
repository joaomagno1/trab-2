import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import ListDiscipline from "../../views/discipline/List";
import CreateDiscipline from "../../views/discipline/Create";
import UpdateDiscipline from "../../views/discipline/Update";
import DeleteDiscipline from "../../views/discipline/Delete";
import ViewDiscipline from "../../views/discipline/View";
import { ROUTES } from "./url";


export const routes: RouteObject[] = [
  {
    path: "/system",
    element: <Layout />,
    children: [
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
        path: `${ROUTES.DISCIPLINE.UPDATE}/:idDiscipline`,
        element: <UpdateDiscipline />,
      },
      {
        path: `${ROUTES.DISCIPLINE.DELETE}/:idDiscipline`,
        element: <DeleteDiscipline />,
      },
      {
        path: `${ROUTES.DISCIPLINE.BY_ID}/:idDiscipline`,
        element: <ViewDiscipline />,
      },
    ],
  },
];

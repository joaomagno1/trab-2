import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetDisciplines } from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { IDiscipline } from "../../services/discipline/type/Discipline";
import { ROUTES } from "../../services/router/url";

const loadDisciplines = async (): Promise<IDiscipline[] | null> => {
  try {
    const response = await apiGetDisciplines();
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
  return null;
};

export default function ListDiscipline() {
  const [disciplines, setDisciplines] = useState<IDiscipline[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const allDisciplines = await loadDisciplines();
      if (allDisciplines) {
        setDisciplines(allDisciplines);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{DISCIPLINE.TITLE.LIST}</h2>
          {/* O <Link> do react-router-dom é o que
              faz a navegação de SPA (sem recarregar a página)
              funcionar. Ele troca o componente no <Outlet>.
          */}
          <Link to={ROUTES.DISCIPLINE.CREATE} className="btn btn-add">
            <span className="btn-icon">
              <i>
                <FaPlus />
              </i>
            </span>
            Novo
          </Link>
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>{DISCIPLINE.LABEL.NAME}</th>
              <th>{DISCIPLINE.LABEL.DESCRIPTION}</th>
              <th className="center actions" colSpan={3}>
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {disciplines?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="center actions">
                  <Link
                    to={`${ROUTES.DISCIPLINE.UPDATE}/${item.id}`}
                    className="btn btn-edit"
                  >
                    <span className="btn-icon">
                      <i>
                        <BsPencilSquare />
                      </i>
                    </span>
                    Atualizar
                  </Link>
                  <Link
                    to={`${ROUTES.DISCIPLINE.DELETE}/${item.id}`}
                    className="btn btn-delete"
                  >
                    <span className="btn-icon">
                      <i>
                        <FaRegTrashAlt />
                      </i>
                    </span>
                    Excluir
                  </Link>
                  <Link
                    to={`${ROUTES.DISCIPLINE.BY_ID}/${item.id}`}
                    className="btn btn-info"
                  >
                    <span className="btn-icon">
                      <i>
                        <FaMagnifyingGlass />
                      </i>
                    </span>
                    Visualizar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetDisciplines } from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { Discipline } from "../../services/discipline/type/Discipline";
import { ROUTES } from "../../services/router/url";

const fetchAllDisciplines = async (): Promise<Discipline[] | null> => {
  try {
    const response = await apiGetDisciplines();
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
  return null;
};

export default function ListDiscipline() {
  const [models, setModels] = useState<Discipline[] | null>(null);

  useEffect(() => {
    async function getDisciplines() {
      const disciplines = await fetchAllDisciplines();
      if (disciplines) {
        setModels(disciplines);
      }
    }
    getDisciplines();
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
            {models?.map((model) => (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.description}</td>
                <td className="center actions">
                  <Link
                    to={`${ROUTES.DISCIPLINE.UPDATE}/${model.id}`}
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
                    to={`${ROUTES.DISCIPLINE.DELETE}/${model.id}`}
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
                    to={`${ROUTES.DISCIPLINE.BY_ID}/${model.id}`}
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

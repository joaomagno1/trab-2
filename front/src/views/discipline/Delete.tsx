import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa"; // Icone errado, mas mantive
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  apiDeleteDiscipline,
  apiGetDiscipline,
} from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { IDiscipline } from "../../services/discipline/type/Discipline";

export default function DeleteDiscipline() {
  const { idDiscipline } = useParams<{ idDiscipline: string }>();
  const [disciplineToDelete, setDisciplineToDelete] = useState<IDiscipline | null>(null);

  useEffect(() => {
    async function fetchDisciplineData() {
      try {
        if (idDiscipline) {
          const response = await apiGetDiscipline(idDiscipline);
          if (response.data.data) {
            setDisciplineToDelete(response.data.data);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchDisciplineData();
  }, [idDiscipline]);

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!idDiscipline || !disciplineToDelete) {
      return;
    }
    try {
      await apiDeleteDiscipline(idDiscipline);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Excluir Disciplina</h2>
        <form onSubmit={handleDelete}>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id="name"
              name="name"
              defaultValue={disciplineToDelete?.name}
              className={getInputClass()}
              readOnly={true}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="description" className="app-label">
              {DISCIPLINE.LABEL.DESCRIPTION}:
            </label>
            <input
              id="description"
              name="description"
              defaultValue={disciplineToDelete?.description}
              className={getInputClass()}
              readOnly={true}
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              className="btn btn-delete"
              title="Excluir a disciplina"
            >
              <span className="btn-icon">
                <i>
                  <FaSave /> 
                </i>
              </span>
              Excluir
            </button>
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              title="Cancelar a exclusão da disciplina"
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
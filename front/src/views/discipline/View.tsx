import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import { apiGetDiscipline } from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { Discipline } from "../../services/discipline/type/Discipline";

export default function ViewDiscipline() {
  const { idDiscipline } = useParams<{ idDiscipline: string }>();
  const [model, setModel] = useState<Discipline | null>(null);

  useEffect(() => {
    async function getDiscipline() {
      try {
        if (idDiscipline) {
          const response = await apiGetDiscipline(idDiscipline);
          if (response.data.data) {
            setModel(response.data.data);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getDiscipline();
  }, [idDiscipline]);

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Visualizar Disciplina</h2>
        <form>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id="name"
              name="name"
              defaultValue={model?.name}
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
              defaultValue={model?.description}
              className={getInputClass()}
              readOnly={true}
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              title="Cancelar a visualização da disciplina"
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

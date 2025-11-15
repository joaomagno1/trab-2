import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  apiGetDiscipline,
  apiPutDiscipline,
} from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { Discipline } from "../../services/discipline/type/Discipline";

export default function UpdateDiscipline() {
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

  const handleChangeField = (name: keyof Discipline, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!idDiscipline || !model) {
      return;
    }
    try {
      await apiPutDiscipline(idDiscipline, model);
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
        <h2>Atualizar Disciplina</h2>
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id="name"
              name="name"
              value={model?.name}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(DISCIPLINE.FIELDS.NAME, e.target.value)
              }
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="description" className="app-label">
              {DISCIPLINE.LABEL.DESCRIPTION}:
            </label>
            <input
              id="description"
              name="description"
              value={model?.description}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(DISCIPLINE.FIELDS.DESCRIPTION, e.target.value)
              }
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              className="btn btn-success"
              title="Salvar alterações da disciplina"
            >
              <span className="btn-icon">
                <i>
                  <FaSave />
                </i>
              </span>
              Salvar
            </button>
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              title="Cancelar alterações da disciplina"
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

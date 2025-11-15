import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  apiGetDiscipline,
  apiPutDiscipline,
} from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { IDiscipline } from "../../services/discipline/type/Discipline";

export default function UpdateDiscipline() {
  // Aluno TSI: O useParams() pega o :idDiscipline da URL
  // que a gente definiu no Router.tsx.
  const { idDiscipline } = useParams<{ idDiscipline: string }>();
  const [disciplineData, setDisciplineData] = useState<IDiscipline | null>(null);

  // Aluno TSI: O useEffect() com array de dependência [idDiscipline]
  // faz com que o 'fetchDiscipline' seja chamado SÓ quando
  // o componente montar ou quando o idDiscipline mudar.
  useEffect(() => {
    async function fetchDiscipline() {
      try {
        if (idDiscipline) {
          const response = await apiGetDiscipline(idDiscipline);
          if (response.data.data) {
            setDisciplineData(response.data.data);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    fetchDiscipline();
  }, [idDiscipline]);

  const handleFieldChange = (name: keyof IDiscipline, value: string) => {
    setDisciplineData((prev) => ({ ...prev, [name]: value } as IDiscipline));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!idDiscipline || !disciplineData) {
      return;
    }
    try {
      await apiPutDiscipline(idDiscipline, disciplineData);
      // Faltou o redirect...
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => {
    // A validação de update não foi implementada
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Atualizar Disciplina</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id="name"
              name="name"
              value={disciplineData?.name || ''} // Controlado
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) =>
                handleFieldChange(DISCIPLINE.FIELDS.NAME, e.target.value)
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
              value={disciplineData?.description || ''} // Controlado
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) =>
                handleFieldChange(DISCIPLINE.FIELDS.DESCRIPTION, e.target.value)
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
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ErrorMessage from "../../components/mensagem/ErrorMessage";
import { apiPostDiscipline } from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { Discipline, DisciplineErrors } from "../../services/discipline/type/Discipline";

export default function CreateDiscipline() {
  const [model, setModel] = useState<Discipline>(DISCIPLINE.INITIAL_DATA);
  const [errors, setErrors] = useState<DisciplineErrors>({});

  const handleChangeField = (name: keyof Discipline, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Message`]: undefined,
    }));
  };

  const validateField = (
    name: keyof Discipline,
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    let messages: string[] = [];
    const value = model[name];

    switch (name) {
      case DISCIPLINE.FIELDS.NAME:
        if (!value) messages.push(DISCIPLINE.INPUT_ERROR.NAME.BLANK);
        if (value && typeof value !== "string")
          messages.push(DISCIPLINE.INPUT_ERROR.NAME.STRING);
        break;
      case DISCIPLINE.FIELDS.DESCRIPTION:
        if (!value || String(value).trim().length === 0) {
          messages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.BLANK);
        }
        if (String(value).length > 0 && String(value).length < 3) {
          messages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MIN_LEN);
        }
        if (String(value).length > 255) {
          messages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MAX_LEN);
        }
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Message`]: messages.length > 0 ? messages : undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: DisciplineErrors = {};
    let isFormValid = true;

    const nameMessages = [];
    if (!model.name) {
      nameMessages.push(DISCIPLINE.INPUT_ERROR.NAME.VALID);
    }
    if (model.name && typeof model.name !== "string") {
      nameMessages.push(DISCIPLINE.INPUT_ERROR.NAME.STRING);
    }
    if (nameMessages.length > 0) {
      newErrors.name = true;
      newErrors.nameMessage = nameMessages;
      isFormValid = false;
    }

    const descriptionMessages = [];
    if (!model.description || model.description.trim().length === 0) {
      descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.BLANK);
    }
    if (model.description) {
      if (model.description.length > 0 && model.description.length < 3) {
        descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MIN_LEN);
      }
      if (model.description.length > 255) {
        descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MAX_LEN);
      }
    }
    if (descriptionMessages.length > 0) {
      newErrors.description = true;
      newErrors.descriptionMessage = descriptionMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const getInputClass = (name: keyof Discipline): string => {
    if (!errors) return "form-control app-label mt-2";
    const hasErrors = errors[name];
    if (hasErrors) {
      return "form-control is-invalid app-label input-error mt-2 ";
    }
    return "form-control app-label mt-2";
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Erro na digitação dos dados");
      return;
    }
    if (!model) return;
    try {
      await apiPostDiscipline(model);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Nova Disciplina</h2>
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id={DISCIPLINE.FIELDS.NAME}
              name={DISCIPLINE.FIELDS.NAME}
              value={model?.name}
              className={getInputClass(DISCIPLINE.FIELDS.NAME)}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(DISCIPLINE.FIELDS.NAME, e.target.value)
              }
              onBlur={(e) => validateField(DISCIPLINE.FIELDS.NAME, e)}
            />
            {errors.name && (
              <ErrorMessage
                error={errors.name}
                message={errors.nameMessage}
              />
            )}
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="description" className="app-label">
              {DISCIPLINE.LABEL.DESCRIPTION}:
            </label>
            <input
              id={DISCIPLINE.FIELDS.DESCRIPTION}
              name={DISCIPLINE.FIELDS.DESCRIPTION}
              value={model?.description}
              className={getInputClass(DISCIPLINE.FIELDS.DESCRIPTION)}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(DISCIPLINE.FIELDS.DESCRIPTION, e.target.value)
              }
              onBlur={(e) => validateField(DISCIPLINE.FIELDS.DESCRIPTION, e)}
            />
            {errors.description && (
              <ErrorMessage
                error={errors.description}
                message={errors.descriptionMessage}
              />
            )}
          </div>
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              className="btn btn-success"
              title="Cadastrar uma nova disciplina"
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
              title="Cancelar o Cadastro da disciplina"
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

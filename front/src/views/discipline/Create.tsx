import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ErrorMessage from "../../components/mensagem/ErrorMessage";
import { apiPostDiscipline } from "../../services/discipline/api/api.discipline";
import { DISCIPLINE } from "../../services/discipline/constants/discipline.constants";
import type { IDiscipline, IDisciplineErrors } from "../../services/discipline/type/Discipline";

export default function CreateDiscipline() {
  //Usando o useState pra controlar o estado do formulário
  // um estado pro dado (formState) e um pros erros (formErrors).
  const [formState, setFormState] = useState<IDiscipline>(DISCIPLINE.INITIAL_DATA);
  const [formErrors, setFormErrors] = useState<IDisciplineErrors>({});

  // Função genérica pra atualizar o estado do formulário
  const handleFieldChange = (name: keyof IDiscipline, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Limpa os erros do campo ao digitar
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Message`]: undefined,
    }));
  };

  // Valida o campo quando o usuário sai dele (onBlur)
  const validateOnBlur = (
    name: keyof IDiscipline,
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    let messages: string[] = [];
    const value = formState[name];

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
    setFormErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Message`]: messages.length > 0 ? messages : undefined,
    }));
  };

  // Validação completa do form, chamada no submit
  const validateForm = (): boolean => {
    const newErrors: IDisciplineErrors = {};
    let isFormValid = true;

    const nameMessages = [];
    if (!formState.name) {
      nameMessages.push(DISCIPLINE.INPUT_ERROR.NAME.VALID);
    }
    if (formState.name && typeof formState.name !== "string") {
      nameMessages.push(DISCIPLINE.INPUT_ERROR.NAME.STRING);
    }
    if (nameMessages.length > 0) {
      newErrors.name = true;
      newErrors.nameMessage = nameMessages;
      isFormValid = false;
    }

    const descriptionMessages = [];
    if (!formState.description || formState.description.trim().length === 0) {
      descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.BLANK);
    }
    if (formState.description) {
      if (formState.description.length > 0 && formState.description.length < 3) {
        descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MIN_LEN);
      }
      if (formState.description.length > 255) {
        descriptionMessages.push(DISCIPLINE.INPUT_ERROR.DESCRIPTION.MAX_LEN);
      }
    }
    if (descriptionMessages.length > 0) {
      newErrors.description = true;
      newErrors.descriptionMessage = descriptionMessages;
      isFormValid = false;
    }

    setFormErrors(newErrors);
    return isFormValid;
  };

  // Helper pra mudar a classe do input (is-invalid)
  const getFormControlClass = (name: keyof IDiscipline): string => {
    if (!formErrors) return "form-control app-label mt-2";
    const hasErrors = formErrors[name];
    if (hasErrors) {
      return "form-control is-invalid app-label input-error mt-2 ";
    }
    return "form-control app-label mt-2";
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("Erro na digitação dos dados");
      return;
    }
    if (!formState) return;
    try {
      await apiPostDiscipline(formState);
      // Aqui faltou o redirect, mas a API foi chamada.
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Nova Disciplina</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2 mt-4">
            <label htmlFor="name" className="app-label">
              {DISCIPLINE.LABEL.NAME}:
            </label>
            <input
              id={DISCIPLINE.FIELDS.NAME}
              name={DISCIPLINE.FIELDS.NAME}
              value={formState?.name}
              className={getFormControlClass(DISCIPLINE.FIELDS.NAME)}
              autoComplete="off"
              onChange={(e) =>
                handleFieldChange(DISCIPLINE.FIELDS.NAME, e.target.value)
              }
              onBlur={(e) => validateOnBlur(DISCIPLINE.FIELDS.NAME, e)}
            />
            {formErrors.name && (
              <ErrorMessage
                error={formErrors.name}
                message={formErrors.nameMessage}
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
              value={formState?.description}
              className={getFormControlClass(DISCIPLINE.FIELDS.DESCRIPTION)}
              autoComplete="off"
              onChange={(e) =>
                handleFieldChange(DISCIPLINE.FIELDS.DESCRIPTION, e.target.value)
              }
              onBlur={(e) => validateOnBlur(DISCIPLINE.FIELDS.DESCRIPTION, e)}
            />
            {formErrors.description && (
              <ErrorMessage
                error={formErrors.description}
                message={formErrors.descriptionMessage}
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
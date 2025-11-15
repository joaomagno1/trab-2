import { createOperationMessage } from "../../constant/mensagem.operacao";

const ENTITY_NAME = "Disciplina";

export const DISCIPLINE = {
  ENTITY: ENTITY_NAME,

  ALIAS: "discipline",

  INITIAL_DATA: {
    name: "",
    description: "",
  },

  FIELDS: {
    ID: "id",
    NAME: "name",
    DESCRIPTION: "description",
  } as const,

  LABEL: {
    NAME: "Nome",
    DESCRIPTION: "Descrição",
  },

  TITLE: {
    LIST: `Listagem de ${ENTITY_NAME}s`,
    CREATE: `Nova ${ENTITY_NAME}`,
    UPDATE: `Atualizar ${ENTITY_NAME}`,
    DELETE: `Excluir ${ENTITY_NAME}`,
    VIEW: `Visualizar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação da ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para a ${ENTITY_NAME}`,
    },
    NAME: {
      BLANK: `O nome da ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um nome válido para a ${ENTITY_NAME}`,
      MAX_LEN: `O nome da ${ENTITY_NAME} deve ter no máximo 80 caracteres`,
      MIN_LEN: `O nome da ${ENTITY_NAME} deve ter no mínimo 3 caracteres`,
      STRING: `O nome da ${ENTITY_NAME} deve ser um texto`,
    },
    DESCRIPTION: {
        BLANK: `A descrição da ${ENTITY_NAME} deve ser informada`,
        VALID: `Informe uma descrição válida para a ${ENTITY_NAME}`,
        MAX_LEN: `A descrição da ${ENTITY_NAME} deve ter no máximo 255 caracteres`,
        MIN_LEN: `A descrição da ${ENTITY_NAME} deve ter no mínimo 3 caracteres`,
        STRING: `A descrição da ${ENTITY_NAME} deve ser um texto`,
    }
  },

  OPERATION: createOperationMessage(ENTITY_NAME),
};

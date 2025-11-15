import { createOperationMessage } from "../../constant/mensagem.operacao";

const entityName = "Disciplina";

export const DISCIPLINE = {
  ENTITY: entityName,

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
    LIST: `Listagem de ${entityName}s`,
    CREATE: `Nova ${entityName}`,
    UPDATE: `Atualizar ${entityName}`,
    DELETE: `Excluir ${entityName}`,
    VIEW: `Visualizar ${entityName}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação da ${entityName} deve ser informado`,
      VALID: `Informe um código de identificação válido para a ${entityName}`,
    },
    NAME: {
      BLANK: `É preciso informar o nome da ${entityName}`,
      VALID: `Informe um nome válido para a ${entityName}`,
      MAX_LEN: `O nome da ${entityName} deve ter no máximo 80 caracteres`,
      MIN_LEN: `O nome da ${entityName} deve ter no mínimo 3 caracteres`,
      STRING: `O nome da ${entityName} deve ser um texto`,
    },
    DESCRIPTION: {
        BLANK: `A descrição da ${entityName} é obrigatória`,
        VALID: `Informe uma descrição válida para a ${entityName}`,
        MAX_LEN: `A descrição da ${entityName} deve ter no máximo 255 caracteres`,
        MIN_LEN: `A descrição da ${entityName} deve ter no mínimo 3 caracteres`,
        STRING: `A descrição da ${entityName} deve ser um texto`,
    }
  },

  OPERATION: createOperationMessage(entityName),
};
export function createOperationMessage(ENTITY_NAME: string) {
  return {
    CREATE: {
      ACTION: `Criar novo cadastro de ${ENTITY_NAME} no sistema`,
      SUCCESS: `O cadastro de ${ENTITY_NAME} foi criado no sistema`,
      ERROR: `Falha ao cadastrar ${ENTITY_NAME} no sistema`,
      EXISTS: `${ENTITY_NAME} já está cadastrado no sistema`,
      CANCEL: `O cadastro de ${ENTITY_NAME} no sistema foi cancelado`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    UPDATE: {
      ACTION: `Atualizar o cadastro de ${ENTITY_NAME} no sistema`,
      SUCCESS: `O cadastro de ${ENTITY_NAME} foi atualizado no sistema`,
      ERROR: `Falha ao atualizar o cadastro de ${ENTITY_NAME} no sistema`,
      NOT_EXISTS: `${ENTITY_NAME} não está cadastrado no sistema`,
      CANCEL: `A alteração do cadastro de ${ENTITY_NAME} no sistema foi cancelada`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    BY_ID: {
      ACTION: `Exibir o cadastro de ${ENTITY_NAME} no sistema`,
      SUCCESS: `O cadastro de ${ENTITY_NAME} foi localizado no sistema`,
      ERROR: `Falha ao localizar o cadastro de ${ENTITY_NAME} no sistema`,
      NOT_EXISTS: `${ENTITY_NAME} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    DELETE: {
      ACTION: `Excluir o cadastro de ${ENTITY_NAME} do sistema`,
      SUCCESS: `O cadastro de ${ENTITY_NAME} foi excluído do sistema`,
      ERROR: `Falha ao excluir o cadastro de ${ENTITY_NAME} do sistema`,
      NOT_EXISTS: `${ENTITY_NAME} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    LIST: {
      ACTION: `Listagem de ${ENTITY_NAME} cadastrados no sistema`,
      SUCCESS: `A consulta dos cadastros de ${ENTITY_NAME} foi realizada com sucesso`,
      ERROR: `Falha na consulta dos cadastros de ${ENTITY_NAME} no sistema`,
    },
  };
}

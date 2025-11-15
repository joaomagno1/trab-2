export function createOperationMessage(entity: string) {
  return {
    CREATE: {
      ACTION: `Criar novo cadastro de ${entity} no sistema`,
      SUCCESS: `O cadastro de ${entity} foi criado no sistema`,
      ERROR: `Falha ao cadastrar ${entity} no sistema`,
      EXISTS: `${entity} já está cadastrado no sistema`,
      CANCEL: `O cadastro de ${entity} no sistema foi cancelado`,
      FIELDS: `Há campos inválidos no cadastro de ${entity}`,
    },
    UPDATE: {
      ACTION: `Atualizar o cadastro de ${entity} no sistema`,
      SUCCESS: `O cadastro de ${entity} foi atualizado no sistema`,
      ERROR: `Falha ao atualizar o cadastro de ${entity} no sistema`,
      NOT_EXISTS: `${entity} não está cadastrado no sistema`,
      CANCEL: `A alteração do cadastro de ${entity} no sistema foi cancelada`,
      FIELDS: `Há campos inválidos no cadastro de ${entity}`,
    },
    BY_ID: {
      ACTION: `Exibir o cadastro de ${entity} no sistema`,
      SUCCESS: `O cadastro de ${entity} foi localizado no sistema`,
      ERROR: `Falha ao localizar o cadastro de ${entity} no sistema`,
      NOT_EXISTS: `${entity} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${entity}`,
    },
    DELETE: {
      ACTION: `Excluir o cadastro de ${entity} do sistema`,
      SUCCESS: `O cadastro de ${entity} foi excluído do sistema`,
      ERROR: `Falha ao excluir o cadastro de ${entity} do sistema`,
      NOT_EXISTS: `${entity} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${entity}`,
    },
    LIST: {
      ACTION: `Listagem de ${entity} cadastrados no sistema`,
      SUCCESS: `A consulta dos cadastros de ${entity} foi realizada com sucesso`,
      ERROR: `Falha na consulta dos cadastros de ${entity} no sistema`,
    },
  };
}
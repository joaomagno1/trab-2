import { DISCIPLINE, MODULES, SUBMODULES } from "./constants.system";

export const SERVER = 'http://localhost:8000';
export const CLIENT = 'http://localhost:3000';

const API = 'api/v1';

const CREATE = 'create';
const LIST   = 'list';
const DELETE = 'delete';
const UPDATE = 'update';

// Função helper pra criar as rotas CRUD
function createApiRoutes(entity: string, paramName: string) {
  const base = `/${API}/${entity}`;
  return {
    BASE: base,
    CREATE: `/${CREATE}`,
    LIST: `/${LIST}`,
    DELETE: `/${DELETE}/:${paramName}`,
    UPDATE: `/${UPDATE}/:${paramName}`,
    FIND_ONE: `/:${paramName}`,
  };
}

// Objeto global de rotas da API
export const ROUTE = {
  DISCIPLINE: createApiRoutes(DISCIPLINE, 'disciplineId'),
  MODULES: createApiRoutes(MODULES, 'moduleId'),
  SUBMODULES: createApiRoutes(SUBMODULES, 'submoduleId'),
};
import { DISCIPLINE } from "../discipline/constants/discipline.constants";

const SYSTEM_ROUTE = "system";
export const DASHBOARD = `/${SYSTEM_ROUTE}/dashboard`;

const FE_LIST = `list`;
const FE_CREATE = "create";
const FE_BY_ID = `view`;
const FE_UPDATE = `update`;
const FE_DELETE = `delete`;

function generateFrontendRoute(entity: string) {
  const base = `${SYSTEM_ROUTE}/${entity}`;
  return {
    LIST: `/${base}/${FE_LIST}`,
    CREATE: `/${base}/${FE_CREATE}`,
    BY_ID: `/${base}/${FE_BY_ID}`,
    UPDATE: `/${base}/${FE_UPDATE}`,
    DELETE: `/${base}/${FE_DELETE}`,
  };
}

export const ROUTES = {
  DISCIPLINE: generateFrontendRoute(DISCIPLINE.ALIAS),
};

const API_BASE_PATH = `/${DISCIPLINE.ALIAS}`;

export const API_ROUTES = {
  DISCIPLINE: {
    LIST: `${API_BASE_PATH}/list`,
    CREATE: API_BASE_PATH,
    BY_ID: API_BASE_PATH,
    UPDATE: API_BASE_PATH,
    DELETE: API_BASE_PATH,
  },
};

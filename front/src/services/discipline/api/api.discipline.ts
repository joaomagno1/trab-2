import { http } from "../../axios/config.axios";
import { API_ROUTES } from "../../router/url";
import type { Discipline } from "../type/Discipline";

export const apiGetDisciplines = async () => {
  const response = await http.get(API_ROUTES.DISCIPLINE.LIST);
  return response;
};

export const apiGetDiscipline = async (idDiscipline: string) => {
  const response = await http.get(`${API_ROUTES.DISCIPLINE.BY_ID}/${idDiscipline}`);
  return response;
};

export const apiPostDiscipline = async (discipline: Discipline) => {
  const response = await http.post(API_ROUTES.DISCIPLINE.CREATE, discipline);
};

export const apiPutDiscipline = async (idDiscipline: string, discipline: Discipline) => {
  const response = await http.put(
    `${API_ROUTES.DISCIPLINE.UPDATE}/${idDiscipline}`,
    discipline,
  );
};

export const apiDeleteDiscipline = async (idDiscipline: string) => {
  const response = await http.delete(`${API_ROUTES.DISCIPLINE.DELETE}/${idDiscipline}`);
};

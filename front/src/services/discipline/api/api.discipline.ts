import { apiClient } from "../../axios/config.axios";
import { API } from "../../router/url"; 
import type { IDiscipline } from "../type/Discipline"; 

export const apiGetDisciplines = async () => {
  const apiResponse = await apiClient.get(API.DISCIPLINE.LIST);
  return apiResponse;
};

export const apiGetDiscipline = async (disciplineId: string) => {
  const apiResponse = await apiClient.get(`${API.DISCIPLINE.BY_ID}/${disciplineId}`);
  return apiResponse;
};

export const apiPostDiscipline = async (data: IDiscipline) => {
  const apiResponse = await apiClient.post(API.DISCIPLINE.CREATE, data);
  return apiResponse;
};

export const apiPutDiscipline = async (disciplineId: string, data: IDiscipline) => {
  const apiResponse = await apiClient.put(
    `${API.DISCIPLINE.UPDATE}/${disciplineId}`,
    data,
  );
  return apiResponse;
};

export const apiDeleteDiscipline = async (disciplineId: string) => {
  const apiResponse = await apiClient.delete(`${API.DISCIPLINE.DELETE}/${disciplineId}`);
  return apiResponse;
};
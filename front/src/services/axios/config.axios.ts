import axios from "axios";
import { API_CONFIG } from "../constant/sistema.constants"; // Mudei para API_CONFIG

//    Criei um cliente "apiClient" do Axios.
// Todas as chamadas pra API vão usar essa instância.
// Fica fácil de configurar a baseURL e timeouts.
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});
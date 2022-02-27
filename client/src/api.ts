import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const insertPatient = (payload: PatientPayload) =>
  api.post(`/patient`, payload);
export const getAllPatients = () => api.get(`/patients`);
export const updatePatientById = (id: string, payload: PatientPayload) =>
  api.put(`/patient/${id}`, payload);
export const deletePatientById = (id: string) => api.delete(`/patient/${id}`);
export const getPatientById = (id: string) => api.get(`/patient/${id}`);

const apis = {
  insertPatient,
  getAllPatients,
  updatePatientById,
  deletePatientById,
  getPatientById,
};

export default apis;

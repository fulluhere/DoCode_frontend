// frontend/src/api/submissions.js
import axios from "axios";

const compilerApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

compilerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createSubmission = (problemId, language, code) =>
  compilerApi.post("/submissions", { problemId, language, code });

export const getSubmission = (id) => compilerApi.get(`/submissions/${id}`);


export const getMySubmissions = () => compilerApi.get("/submissions");
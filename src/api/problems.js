
import api from "./axios";

export const getAllProblems = () => api.get("/problems");
export const getProblemBySlug = (slug) => api.get(`/problems/${slug}`);
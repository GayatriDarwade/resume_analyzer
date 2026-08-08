import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeResume = async (resume, jobDescription) => {
  const formData = new FormData();

  formData.append("uploaded_file", resume);
  formData.append("job_description", jobDescription);

  const response = await api.post("/analyze", formData);

  return response.data;
};
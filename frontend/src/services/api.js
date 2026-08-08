import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const analyzeResume = async (resume, jobDescription) => {
  const formData = new FormData();

  formData.append("uploaded_file", resume);
  formData.append("job_description", jobDescription);

  const response = await api.post("/analyze", formData);

  return response.data;
};
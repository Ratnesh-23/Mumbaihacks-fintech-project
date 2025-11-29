import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

// classify transaction
export const classifyTransaction = (text) =>
  API.post("/classify", { text });

// predict next income
export const predictIncome = (sequence) =>
  API.post("/predict_income", { sequence });

// generate advice
export const getAdvice = (data) =>
  API.post("/advice", data);

export default API;

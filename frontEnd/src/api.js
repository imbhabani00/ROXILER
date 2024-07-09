import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getTransactions = (month) =>
  api.get(`/transactions/list?month=${month}`);

export const getStatistics = (month) =>
  api.get(`/transactions/statistics?month=${month}`);

export const getBarChartData = (month) =>
  api.get(`/transactions/barchart?month=${month}`);

export const getPieChartData = (month) =>
  api.get(`/transactions/piechart?month=${month}`);

export default api;

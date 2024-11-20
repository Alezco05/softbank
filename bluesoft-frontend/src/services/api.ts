import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/clients" });

export const getClients = async () => (await API.get("/")).data;
export const getAccountBalance = async (clientId: number, accountId: number) =>
  (await API.get(`/${clientId}/${accountId}/balance`)).data;
export const getRecentTransactions = async (clientId: number, accountId: number) =>
  (await API.get(`/${clientId}/${accountId}/recent-transactions`)).data;
export const getMonthlyStatement = async (
  clientId: number,
  accountId: number,
  month: number,
  year: number
) =>
  (await API.get(`/${clientId}/${accountId}/statement`, {
    params: { month, year },
  })).data;
export const getTopClientsByTransactions = async (month: number, year: number) =>
  (await API.get("/reports/top-transactions", { params: { month, year } })).data;
export const getHighValueWithdrawals = async () =>
  (await API.get("/reports/high-withdrawals")).data;

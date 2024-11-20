const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/database.json");

const readDatabase = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

const getClients = () => {
  const data = readDatabase();
  return data.clients;
};

const getClientById = (id) => {
  const data = readDatabase();
  return data.clients.find((client) => client.id === parseInt(id));
};


const getAccountBalance = (clientId, accountId) => {
  const client = getClientById(clientId);
  if (!client) throw new Error("Client not found");

  const account = client.accounts.find((a) => a.id === parseInt(accountId));
  if (!account) throw new Error("Account not found");

  return account.balance;
};

const getRecentTransactions = (clientId, accountId) => {
  const client = getClientById(clientId);
  if (!client) throw new Error("Client not found");

  const account = client.accounts.find((a) => a.id === parseInt(accountId));
  if (!account) throw new Error("Account not found");

  return account.transactions
    .slice(-5)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getMonthlyStatement = (clientId, accountId, month, year) => {
  const client = getClientById(clientId);
  if (!client) throw new Error("Client not found");

  const account = client.accounts.find((a) => a.id === parseInt(accountId));
  if (!account) throw new Error("Account not found");

  const transactionsInMonth = account.transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
  });

  const totalDeposits = transactionsInMonth
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactionsInMonth
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    transactions: transactionsInMonth,
    totalDeposits,
    totalWithdrawals,
  };
};

const getTopClientsByTransactions = (month, year) => {
  const data = readDatabase();
  return data.clients
    .map((client) => {
      const totalTransactions = client.accounts.reduce((sum, account) => {
        const transactionsInMonth = account.transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
        });
        return sum + transactionsInMonth.length;
      }, 0);

      return { clientId: client.id, name: client.name, totalTransactions };
    })
    .sort((a, b) => b.totalTransactions - a.totalTransactions);
};

const getHighValueWithdrawals = () => {
  const data = readDatabase();

  return data.clients
    .map((client) => {
      const highWithdrawals = client.accounts.flatMap((account) =>
        account.transactions.filter(
          (t) => t.type === "withdrawal" && t.amount > 1000000 && t.outOfCity
        )
      );

      return highWithdrawals.length > 0
        ? {
            clientId: client.id,
            name: client.name,
            totalWithdrawn: highWithdrawals.reduce((sum, t) => sum + t.amount, 0),
          }
        : null;
    })
    .filter((entry) => entry !== null);
};

module.exports = {
  getClients,
  getClientById,
  createTransaction,
  getAccountBalance,
  getRecentTransactions,
  getMonthlyStatement,
  getTopClientsByTransactions,
  getHighValueWithdrawals,
};

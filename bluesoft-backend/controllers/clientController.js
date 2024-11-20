//@ts-check
const clientService = require("../services/clientService");

exports.getClients = (_, res) => {
  try {
    const clients = clientService.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClient = (req, res) => {
  try {
    const client = clientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAccountBalance = (req, res) => {
  try {
    const balance = clientService.getAccountBalance(req.params.clientId, req.params.accountId);
    res.json({ balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecentTransactions = (req, res) => {
  try {
    const transactions = clientService.getRecentTransactions(req.params.clientId, req.params.accountId);
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMonthlyStatement = (req, res) => {
  try {
    const { month, year } = req.query;
    const statement = clientService.getMonthlyStatement(req.params.clientId, req.params.accountId, month, year);
    res.json(statement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTopClientsByTransactions = (req, res) => {
  try {
    const { month, year } = req.query;
    const stats = clientService.getTopClientsByTransactions(month, year);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHighValueWithdrawals = (_, res) => {
  try {
    const data = clientService.getHighValueWithdrawals();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

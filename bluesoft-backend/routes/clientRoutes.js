const express = require("express");
const {
  getClients,
  getClient,
  getAccountBalance,
  getRecentTransactions,
  getMonthlyStatement,
  getTopClientsByTransactions,
  getHighValueWithdrawals,
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", getClients);
router.get("/:id", getClient);
router.get("/:clientId/:accountId/balance", getAccountBalance);
router.get("/:clientId/:accountId/recent-transactions", getRecentTransactions);
router.get("/:clientId/:accountId/statement", getMonthlyStatement);
router.get("/reports/top-transactions", getTopClientsByTransactions);
router.get("/reports/high-withdrawals", getHighValueWithdrawals);

module.exports = router;

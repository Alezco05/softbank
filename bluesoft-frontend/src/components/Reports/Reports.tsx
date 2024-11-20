import "./Reports.css"

import React, { useState, useEffect } from "react";
import { getTopClientsByTransactions, getHighValueWithdrawals } from "../../services/api";

const Reports: React.FC = () => {
  const [topClients, setTopClients] = useState<any[]>([]);
  const [highWithdrawals, setHighWithdrawals] = useState<any[]>([]);

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    getTopClientsByTransactions(month, year).then(setTopClients);

    getHighValueWithdrawals().then(setHighWithdrawals);
  }, []);

  return (
    
    <div className="reports-container">
    
      <div className="report-section">
        <h3>Top Clients by Transactions</h3>
        <ul>
          {topClients.map((client) => (
            <li key={client.clientId} className="report-item">
              <span>{client.name}</span>
              <span>{client.totalTransactions} transactions</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h3>High Value Withdrawals</h3>
        <ul>
          {highWithdrawals.map((client) => (
            <li key={client.clientId} className="report-item">
              <span>{client.name}</span>
              <span>${client.totalWithdrawn} withdrawn</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;

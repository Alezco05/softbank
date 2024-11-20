import "./AccountDetails.css";

import React, { useEffect, useState } from "react";
import {
  getAccountBalance,
  getRecentTransactions,
  getMonthlyStatement,
} from "../../services/api";

interface AccountDetailsProps {
  clientId: number;
  account: { id: number; type: string };
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ clientId, account }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [monthlyStatement, setMonthlyStatement] = useState<any>(null);

  useEffect(() => {
    setBalance(0);
    setTransactions([]);
    setMonthlyStatement(null);

    getAccountBalance(clientId, account.id).then((data) => setBalance(data.balance));
    getRecentTransactions(clientId, account.id).then(setTransactions);
  }, [clientId, account.id]); 

  return (
    <div className="account-details-container">
      <h3>Account Details ({account.type})</h3>
      <div className="balance">
        <p>Balance: <strong>${balance}</strong></p>
      </div>

      <div className="transactions">
        <h4>Recent Transactions</h4>
        <ul>
          {transactions.map((t) => (
            <li key={t.id} className="transaction-item">
              <span className={`transaction-type ${t.type}`}>
                {t.type}: 
              </span>
              <span className="transaction-amount">${t.amount}</span>
              <span className="transaction-date">on {t.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {monthlyStatement && (
        <div className="monthly-statement">
          <h4>Monthly Statement</h4>
          <div className="statement-summary">
            <p>Total Deposits: <strong>${monthlyStatement.totalDeposits}</strong></p>
            <p>Total Withdrawals: <strong>${monthlyStatement.totalWithdrawals}</strong></p>
          </div>
          <ul>
            {monthlyStatement.transactions.map((t: any) => (
              <li key={t.id} className="transaction-item">
                <span className={`transaction-type ${t.type}`}>
                  {t.type}: 
                </span>
                <span className="transaction-amount">${t.amount}</span>
                <span className="transaction-date">on {t.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;

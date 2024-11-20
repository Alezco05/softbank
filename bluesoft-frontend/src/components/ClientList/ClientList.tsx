import "./ClientList.css";

import React, { useEffect, useState } from "react";
import { getClients } from "../../services/api";
import AccountDetails from "../AccountDetails/AccountDetails";

interface Client {
  id: number;
  name: string;
  accounts: { id: number; type: string }[];
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  useEffect(() => {
    getClients().then(setClients).catch(console.error);
  }, []);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    // Seleccionar automáticamente la primera cuenta del cliente
    if (client.accounts.length > 0) {
      setSelectedAccount(client.accounts[0]);
    }
  };

  return (
    <div className="client-list-container">
      <div className="client-list">
        <h2>Clients</h2>
        <ul>
          {clients.map((client) => (
            <li
              key={client.id}
              onClick={() => handleSelectClient(client)}
              className={`client-item ${
                selectedClient?.id === client.id ? "selected" : ""
              }`}
            >
              {client.name} ({client.accounts.length} accounts)
            </li>
          ))}
        </ul>
      </div>
      <div className="account-details">
        {selectedClient && selectedAccount ? (
          <AccountDetails clientId={selectedClient.id} account={selectedAccount} />
        ) : (
          <p>Select a client to view account details.</p>
        )}
      </div>
    </div>
  );
};

export default ClientList;

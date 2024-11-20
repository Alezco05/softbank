import React, { useState } from "react";
import ClientList from "./components/ClientList/ClientList";
import Reports from "./components/Reports/Reports";
import "./App.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("clients");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Bluesoft Dashboard</h1>
        <ul className="nav-links">
          <li
            className={activeTab === "clients" ? "active" : ""}
            onClick={() => setActiveTab("clients")}
          >
            Clients
          </li>
          <li
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="container">
        {activeTab === "clients" && <ClientList />}
        {activeTab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default App;

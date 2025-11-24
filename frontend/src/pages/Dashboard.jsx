import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchIntruderLogs } from "../services/api";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const getLogs = async () => {
      const data = await fetchIntruderLogs(token);
      setLogs(data);
    };
    getLogs();
  }, [token]);

  return (
    <div>
      <Navbar />
      <h1>Intruder Logs</h1>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <img src={`http://localhost:8000${log.photo}`} alt="Intruder" width={100} />
            <p>{log.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

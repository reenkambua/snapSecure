import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/devices">Devices</Link> | 
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;

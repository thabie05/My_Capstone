// components/Navbar.js
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "./Images/logo.png";

const Navbar = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  if (loading) return null;

  return (
    <div className="bg-linear-to-b from-red-4 via-gray-700 to-yellow-4 items-center max-w-[1900px] flex flex-wrap justify-between p-4 mx-auto">
      <div className="flex items-center gap-4">
        <img className="h-10" src={logo} alt="logo" />
        {isAuthenticated && (
          <span className="text-white font-medium">Welcome, {user?.name}!</span>
        )}
      </div>

      <nav className="gap-10 flex items-center">
        {isAuthenticated ? (
          <>
            <Link className="text-white font-bold hover:text-blue-300 hover:scale-125 transition-all duration-300" to="/">Home</Link>
            <Link className="text-white font-bold hover:text-blue-300 hover:scale-125 transition-all duration-300" to="/overview">Overview</Link>
            <Link className="text-white font-bold hover:text-blue-300 hover:scale-125 transition-all duration-300" to="/about">About</Link>
            <Link className="text-white font-bold hover:text-blue-300 hover:scale-125 transition-all duration-300" to="/user">Profile</Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">Logout</button>
          </>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
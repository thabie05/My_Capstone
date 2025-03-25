import { Link } from "react-router-dom"
import logo from "./Images/logo.png"


const Navbar = () => {
    return (
      <div className="bg-gray-600 flex justify-between items-center p-4 max-w-900 mx-auto">
        <img className="h-10" src={logo} alt="logo" />
        <h1>Finance App</h1>
      <nav className="gap-10 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/Overview">Overview</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        
      </nav>
      </div>
    );
  };


export default Navbar

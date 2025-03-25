import { Link } from "react-router-dom"
import logo from "./Images/logo.png"


const Navbar = () => {
    return (
      <div className="bg-linear-to-b from-red-4 via-gray-700 to-yellow-4 items-center flex flex-wrap justify-between p-4 mx-auto">
        <img className="h-10" src={logo} alt="logo" />
      <nav className="gap-10 flex items-center">
        <Link className="text-white font-bold hover:text-amber-300 hover:scale-125 hover:transition-all duration-300 ease-in" to="/">Home</Link>
        <Link className="text-white font-bold hover:text-amber-300 hover:scale-125 hover:transition-all duration-300 ease-in" to="/Overview">Overview</Link>
        <Link className="text-white font-bold hover:text-amber-300 hover:scale-125 hover:transition-all duration-300 ease-in" to="/about">About</Link>
        <Link className="text-white font-bold hover:text-amber-300 hover:scale-125 hover:transition-all duration-300 ease-in" to="/contact">Contact</Link>
      </nav>
      </div>
    );
  };


export default Navbar

import { Link } from "react-router-dom"
import logo from "./Images/logo.png"


const Navbar = () => {
    return (
      <div className="bg-linear-to-b from-red-4 via-gray-700 to-yellow-4 items-center flex sm:justify-center flex-wrap md:justify-between px-10 md:px-40 py-4 shadow-lg">
        <div className="flex items-center font-bold text-white text-xl" id="logo">
          <img className="h-10" src={logo} alt="logo" />
          <span>Track My Expenses</span>
        </div>
        <nav className="gap-4 md:gap-10 flex items-center text-sm md:text-base">
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/"><i className="fa fa-home"> Home</i></Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/Overview">Overview</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/about">About</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/User">User</Link>
        </nav>
      </div>
    );
  };


export default Navbar;

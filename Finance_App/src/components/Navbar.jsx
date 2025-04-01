import { Link } from "react-router-dom"
import logo from "./Images/logo.png"


const Navbar = () => {
    return (
      <div className="bg-linear-to-b from-red-4 via-gray-700 to-yellow-4 items-center flex justify-between px-40 py-4 shadow-lg">
        <div className="flex items-center" id="logo"><img className="h-10" src={logo} alt="logo" />Track My Expense</div>
      <nav className="gap-4 md:gap-10 flex items-center text-sm md:text-base">
        <Link className="text-white font-bold after:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/">Home</Link>
        <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/Overview">Overview</Link>
        <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/about">About</Link>
        <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/contact">Contact</Link>
      </nav>
      </div>
    );
  };


export default Navbar;

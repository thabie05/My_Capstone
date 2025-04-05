import { Link, NavLink } from "react-router-dom"
import logo from "./Images/logo.png"
import { useState } from "react";




const Navbar = () => {

  const [moblieActive, setMobileActive] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileActive(!moblieActive);
  };

  

    return (
      <div className="bg-linear-to-b from-red-4 via-gray-700 to-yellow-4 items-center flex sm:justify-center flex-wrap md:justify-between px-10 md:px-10 py-4 shadow-lg">
        <div>
        <div className="flex justify-between gap-40 items-center font-bold text-white text-xl">
        <div className="flex items-center font-bold text-white text-xl" id="logo">
          <img className="h-10" src={logo} alt="logo" />
          <span>Track My Expenses</span>
        </div>
        <div className="md:hidden flex flex-col items-center ml-auto" onClick={toggleMobileMenu}>
          <i className={`fa-solid fa-${moblieActive ? "xmark" : "bars"} text-white text-2xl hover:text-blue-300 hover:scale-125 hover:transition-all duration-300 ease-in`}></i>
        </div>
        </div>
        <div>
        {moblieActive && 
        <nav className="gap-10 md:gap-10 md:hidden mt-10 flex flex-col items-center text-sm md:text-base">
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/"><i class="fa-solid fa-house"></i> Home</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/Overview"><i className="fa fa-bar-chart-o"></i> Overview</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/about"><i className="fa fa-info-circle"></i>  About</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/User"><i class="fa-solid fa-user"></i> User</Link>
        </nav>}
        </div>
        </div>
        <div className="hidden md:flex items-center ml-auto">
        <nav className="gap-4 md:gap-10 flex items-center text-sm md:text-base">
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/"><i class="fa-solid fa-house"></i> Home</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/Overview"><i className="fa fa-bar-chart-o"></i> Overview</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/about"><i className="fa fa-info-circle"></i>  About</Link>
          <Link className="text-white font-bold focus:text-blue-300 hover:text-blue-300 focus:scale-125 hover:scale-125 hover:transition-all duration-300 ease-in" to="/User"><i class="fa-solid fa-user"></i> User</Link>
        </nav>
        </div>
      </div>
    );
  };


export default Navbar;

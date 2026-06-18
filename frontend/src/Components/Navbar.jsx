import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({activePage,}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white">
        
        {/* Logo */}
        <Link to="/home">
        <h1 className="text-blue-400 text-2xl font-bold">
          KRISH
        </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          <Link to="/home"> <li className={activePage === "home" ? "text-blue-400":"hover:text-white cursor-pointer"}>Home</li></Link>
          <Link to="/skills"> <li className={activePage === "skills" ? "text-blue-400":"hover:text-white cursor-pointer"}>Skills</li></Link>
          <Link to="/aboutMe"> <li className={activePage === "aboutMe" ? "text-blue-400":"hover:text-white cursor-pointer"}>About me</li></Link>
          <Link to="/projects"> <li className={activePage === "projects" ? "text-blue-400":"hover:text-white cursor-pointer"}>Projects</li></Link>
          <Link to="/contactMe"> <li className={activePage === "contactMe" ? "text-blue-400":"hover:text-white cursor-pointer"}>Contact me</li></Link>
        </ul>

        {/* Desktop Button */}
        <a href="mailto:krishkarki24680@gmail.com">
        <button className="hidden md:block bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 cursor-pointer">
          Hire Me
        </button>
      </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-800 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col gap-8 text-gray-300 mt-24 px-8 text-lg">
          <Link to="/home"> <li className={activePage === "home" ? "text-blue-400":"hover:text-white cursor-pointer"}>Home</li></Link>
          <Link to="/skills"> <li className={activePage === "skills" ? "text-blue-400":"hover:text-white cursor-pointer"}>Skills</li></Link>
          <Link to="/aboutMe"> <li className={activePage === "aboutMe" ? "text-blue-400":"hover:text-white cursor-pointer"}>About me</li></Link>
          <Link to="/projects"> <li className={activePage === "projects" ? "text-blue-400":"hover:text-white cursor-pointer"}>Projects</li></Link>
          <Link to="/contactMe"> <li className={activePage === "contactMe" ? "text-blue-400":"hover:text-white cursor-pointer"}>Contact me</li></Link>

          <a href="mailto:krishkarki24680@gmail.com">
          <button className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 mt-4 cursor-pointer">
            Hire Me
          </button>
        </a>
        </ul>
      </div>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
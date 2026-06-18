import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCogs
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function AdminPanel({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };


  return (
    <div className="min-h-screen bg-[#050B1A] text-white flex flex-col relative overflow-x-hidden">
      
      {/* TOP BAR */}
      <div className="h-16 bg-[#0B1224] border-b border-blue-500/30 flex items-center justify-between md:justify-center px-4 md:px-0 z-50">
        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu} 
          className="text-xl text-blue-400 md:hidden focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="tracking-[0.2rem] md:tracking-[0.5rem] text-lg md:text-xl font-bold text-blue-400 mx-auto md:mx-0">
          ADMIN DASHBOARD
        </h1>
        
        {/* Invisible spacer to balance the flex layout on mobile */}
        <div className="w-6 md:hidden"></div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 relative">
        
        {/* SIDEBAR (Desktop) & SLIDEOUT MENU (Mobile) */}
        <div className={`
          fixed md:static top-16 left-0 h-[calc(100vh-4rem)] md:h-auto w-64 bg-[#0B1224] 
          border-r border-blue-500/20 flex flex-col justify-between py-8 z-40
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}>
          {/* MENU */}
          <div className="space-y-6 px-6 text-lg">

  <Link
    to="/auth/home"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaHome />
    Home
  </Link>

  <Link
    to="/auth/skills"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaCode />
    Skills
  </Link>

  <Link
    to="/auth/aboutMe"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaUser />
    About Me
  </Link>

  <Link
    to="/auth/projects"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaProjectDiagram />
    Projects
  </Link>

  <Link
    to="/auth/contactMe"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaEnvelope />
    Contact Me
  </Link>



  <Link
    to="/auth/settings"
    className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <FaCogs />
    Settings
    </Link>

</div>

          {/* LOGOUT */}
          <div className="px-6">
            <div className="flex items-center gap-3 text-red-400 hover:text-red-500 cursor-pointer" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        </div>

        {/* BACKGROUND OVERLAY (Mobile only - closes menu when clicking outside) */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 top-16 bg-black/50 z-30 md:hidden"
            onClick={toggleMenu}
          />
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-[#D9D9D9] m-4 rounded-lg shadow-lg min-h-[300px] text-black p-4">
            {children}
        </div>
      </div>
    </div>
  );
}
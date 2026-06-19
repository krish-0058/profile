import img1 from "../assets/1.png";
import { FaGithub,FaFacebook,FaInstagram,FaLinkedin,FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";

import { useEffect,useRef,useState } from "react";
import Typed from "typed.js"
import '../assets/styles.css'





export default function App() {

  const typedRef = useRef(null)
  const [data,setData] = useState({})
  const [link,setLink] = useState({})
  const [loading, setLoading] = useState(true);
  

  useEffect(()=>{

    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/home`,{
      method:"GET"
    })

    const result = await response.json()

    setData(result.data)
    setLoading(false);
    }

    fetchData()
    
  },[])









  useEffect(()=>{

    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`,{
      method:"GET"
    })

    const result = await response.json()
    setLink(result.data)
    }

    fetchData()
    
  },[])








  useEffect(()=>{
    
    if(!data.profession) return

    const typed1 = new Typed(typedRef.current, {
      strings: [
        "IT Enthusiast",
        data.profession
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 3000,
      loop: true,
    });

    return () => {
      typed1.destroy()
    };
  },[data.profession])







  

 














  if (loading) {
    return (
      <div className="bg-[#050B1A] min-h-screen font-sans flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )  
  }










  return (

    <div className="bg-[#050B1A] text-white min-h-screen font-sans">

      {/* NAVBAR */}
      <Navbar activePage={"home"}/>

      {/* HERO SECTION */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 mt-10 fade-up">

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 mt-10 md:mt-0">

          <p className="text-gray-400">{data.greeting}</p>
          <h2 className="text-2xl font-semibold">{data.naam}</h2>

          <h1 className="text-4xl md:text-6xl font-semibold text-blue-400 mt-2">
            <span ref={typedRef}></span>
          </h1>

          <p className="text-gray-500 text-lg mt-4 leading-relaxed">
            {data.description}
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 mt-10 text-gray-400">

            <a href={link.facebook} className="border border-blue-500 p-2 rounded-full hover:bg-blue-500/20 transition">
              <FaFacebook />
            </a>

            <a href={link.instagram} className="border border-blue-500 p-2 rounded-full hover:bg-blue-500/20 transition">
              <FaInstagram />
            </a>

            <a href={link.linkedin} className="border border-blue-500 p-2 rounded-full hover:bg-blue-500/20 transition">
              <FaLinkedin />
            </a>

            <a href={link.whatsapp} className="border border-blue-500 p-2 rounded-full hover:bg-blue-500/20 transition">
              <FaWhatsapp />
            </a>

            <a href={link.github} className="border border-blue-500 p-2 rounded-full hover:bg-blue-500/20 transition">
              <FaGithub />
            </a>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">
            <a href={link.phone}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md shadow-blue-500/30 cursor-pointer">
                Call Now 📞
              </button>
            </a>

            <a href={data.pdf} rel="noopener noreferrer" download>
              <button className="border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500/10 cursor-pointer">
                Download CV
              </button>
            </a>
          </div>

          {/* STATS */}
          <div className="flex gap-7 mt-12 mb-10 bg-[#0B1224] p-4 rounded-xl w-fit border border-blue-500/20">

            <div className="pr-6 border-r border-blue-500/20">
              <h3 className="text-blue-400 text-xl font-bold">{data.experience}+</h3>
              <p className="text-sm text-gray-400">Experience</p>
            </div>

            <div className="pr-6 border-r border-blue-500/20">
              <h3 className="text-blue-400 text-xl font-bold">{data.projects}+</h3>
              <p className="text-sm text-gray-400">Projects</p>
            </div>

            <div>
              <h3 className="text-blue-400 text-xl font-bold">{data.clients}+</h3>
              <p className="text-sm text-gray-400">Happy Clients</p>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">

            {/* glow circle */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 blur-2xl rounded-full fade-up1"></div>

            <div className="absolute w-72 h-72 md:w-96 md:h-96 border border-blue-500/20 rounded-full fade-up1"></div>

            <img
              src={data.image ? data.image : img1}
              alt="profile"
              className="relative w-72 md:w-96 object-cover rounded-full fade-up1"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
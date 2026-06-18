import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import '../assets/styles.css'


import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaViber,
  FaEnvelope,
  FaWhatsapp,
  FaPhone
} from "react-icons/fa";

export default function Contact() {

  const [link,setLink] = useState({})
  const [loading, setLoading] = useState(true);
  const [client,setClient] = useState({
    clientName:"",
    clientEmail:"",
    clientMessage:""
  })




  const handleChange = (e)=>{
    const data = {...client,[e.target.name]:e.target.value}
    setClient(data)
  }



  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(client)
      })
      if(response.ok){
        alert("Your message is sent..")
        setClient({
          clientName:"",
          clientEmail:"",
          clientMessage:""
      })}
    }catch(err){
      console.log(err)
    } 
  }







  useEffect(()=>{
  
      const fetchData = async () =>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`,{
        method:"GET"
      })
  
      const result = await response.json()
      console.log(result.data)
      setLink(result.data)
      setLoading(false)
      }
  
      fetchData()
      
    },[])










  if (loading) {
    return (
      <div className="bg-[#050B1A] min-h-screen font-sans flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )  
  }



  return (
    <div className="min-h-screen bg-[#050B1A] text-white">
      <Navbar activePage={"contactMe"}/>

      <div className="flex items-center justify-center px-4 py-10 mt-1 md:mt-10 fade-up">
        <div className="w-full max-w-4xl bg-[#0B1224]/80 backdrop-blur-md border border-blue-500/20  rounded-2xl p-8 flex flex-col md:flex-row gap-10 hover:scale-[1.03] transition duration-300">

          {/* LEFT - FORM */}
          <form onSubmit={handleSubmit}>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Me</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                name="clientName"
                value={client.clientName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                name="clientEmail"
                value={client.clientEmail}
                onChange={handleChange}
                required
              />

              <textarea
                rows="4"
                placeholder="Message"
                className="w-full bg-transparent border-b border-white/30 outline-none py-2"
                name="clientMessage"
                value={client.clientMessage}
                onChange={handleChange}
                required
              />

              <button type="submit" className="mt-4 w-full bg-sky-900 py-2 rounded-full hover:opacity-80">
                Send Message
              </button>
            </div>
          </div>
          </form>

          {/* RIGHT - SOCIAL CIRCLE */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72 rounded-full">

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-400">
                  Connect
                </span>
              </div>

              {/* ICONS */}
 
            
             {/* Facebook - Top */}
             <a href={link.facebook}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <FaFacebook className="text-6xl p-2 border border-blue-500 rounded-full hover:text-blue-500 transition" />
              </div>
              </a>

              {/* Top Right */}
              <a href={link.instagram}>
              <div className="absolute top-[10%] right-[10%]">
                <FaInstagram className="text-6xl p-2 border border-blue-500 rounded-full hover:text-pink-500 transition" />
              </div>
              </a>

              {/* Right */}
              <a href={link.phone}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <FaPhone className="text-6xl p-2 border border-blue-500 rounded-full hover:text-blue-400 transition" />
              </div>
              </a>

              {/* Bottom Right */}
              <a href={link.whatsapp}>
              <div className="absolute bottom-[10%] right-[10%]">
                <FaWhatsapp className="text-6xl p-2 border border-blue-500 rounded-full hover:text-green-500 transition" />
              </div>
              </a>

              {/* Bottom */}
              <a href={link.viber}>
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                <FaViber className="text-6xl p-2 border border-blue-500 rounded-full hover:text-purple-500 transition" />
              </div>
              </a>

              {/* Bottom Left */}
              <a href={link.email}>
              <div className="absolute bottom-[10%] left-[10%]">
                <FaEnvelope className="text-6xl p-2 border border-blue-500 rounded-full hover:text-yellow-400 transition" />
              </div>
              </a>

              {/* Left */}
              <a href={link.linkedin}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <FaLinkedin className="text-6xl p-2 border border-blue-500 rounded-full hover:text-blue-400 transition" />
              </div>
              </a>

              {/* Top Left */}
              <a href={link.github}>
              <div className="absolute top-[10%] left-[10%]">
                <FaGithub className="text-6xl p-2 border border-blue-500 rounded-full hover:text-gray-400 transition" />
              </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
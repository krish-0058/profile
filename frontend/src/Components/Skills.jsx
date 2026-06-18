import { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import '../assets/styles.css'


export default function Skills() {


  const [skills,setSkills] = useState([])
  const [softs,setSofts] = useState([])
  const [works,setWorks] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const [skillRes,softRes,workRes] = await Promise.all(
        [
          fetch(`${import.meta.env.VITE_BACKEND_URL}/skills`,{method:"GET"}),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/soft`,{method:"GET"}),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/work`,{method:"GET"})
        ]
      ) 
        const [skillData,softData,workData] = await Promise.all([
          skillRes.json(),softRes.json(),workRes.json()
        ])

        setSkills(skillData.data)
        setSofts(softData.data)
        setWorks(workData.data)
        setLoading(false)
      }
      catch(err){
        console.log(err)
      }}
      
    fetchData()
  },[])







  if (loading) {
    return (
      <div className="bg-[#050B1A] min-h-screen font-sans flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )}




  return (
    <div className="bg-[#050B1A] text-white min-h-screen font-sans"> 
    
    <Navbar activePage={"skills"}/>

    <div className="flex items-center justify-center mt-6 md:mt-11 px-5">
        
      <div className="w-full max-w-5xl">


       {/* MERN Card */}
       <div className="flex flex-row flex-wrap gap-6 justify-center fade-up">
      {skills.map((skill)=>(
        <div className="bg-[#0B1224]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 max-w-sm mx-auto mb-10">

              
            
            <h3 className="text-xl font-bold text-blue-400 mb-2">
                {skill.skillTitle}
            </h3>

            <p className="text-gray-400 text-sm mb-4">
                {skill.skillDesp}
            </p>

            {/* Tech Tags */}
            {/* <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                MongoDB
                </span>
                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                Express
                </span>
                <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">
                React
                </span>
                <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
                Node.js
                </span>
            </div> */}

            {/* Links */}
            <div className="flex gap-4">
                <a
                href={skill.projectsLink}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                Projects →
                </a>

                <a
                href={skill.githubLink}
                className="text-sm text-gray-400 hover:text-white transition"
                >
                GitHub →
                </a>
            </div>

        </div>

        ))}
        </div>
        



        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">

          {/* Soft Skills */}
          <div className="bg-[#0B1224]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:scale-[1.02] transition duration-300 fade-in1">

            <h3 className="text-lg font-semibold text-blue-300 mb-6">
              Soft Skills
            </h3>

            {softs.map((soft)=>(
              <Skill label={soft.skillTitle} value={soft.skillValue} />
            ))}
          </div>

          {/* Work Ethics */}
          <div className="bg-[#0B1224]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:scale-[1.02] transition duration-300 fade-in2">

            <h3 className="text-lg font-semibold text-blue-300 mb-6">
              Work Ethics
            </h3>

            {works.map((work)=>(
              <Skill label={work.ethicsTitle} value={work.ethicsValue} />
            ))}
            
      
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}

/* Reusable Skill Bar */
function Skill({ label, value }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300 text-sm">{label}</span>
        <span className="text-blue-400 text-sm">{value}%</span>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
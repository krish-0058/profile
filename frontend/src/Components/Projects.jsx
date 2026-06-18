import { useEffect } from "react"
import Navbar from "./Navbar"
import { useState } from "react"
import '../assets/styles.css'


function Projects() {

    const [projects,setProjects] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        
      const fetchData = async () =>{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`,{
        method:"GET"
      })
  
      const result = await response.json()

      setProjects(result.data)
      setLoading(false)
      }
  
      fetchData()
    },[])





    if (loading) {
    return (
      <div className="bg-[#050B1A] min-h-screen font-sans flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )}





  return (
    <div className="min-h-screen bg-[#050B1A] text-white">
        <Navbar activePage={"projects"}/>

        <div className="flex flex-row flex-wrap justify-center gap-8 px-4 py-8 fade-up">
        {projects.map((project)=>(
            <ProjectsCard
                title={project.projectTitle}
                image={project.image}
                desc={project.projectDesp}
                viewLink={project.projectLink}
                githubLink={project.githubLink}
            />
        ))}

        </div>

    </div>
  )
}

export default Projects




function ProjectsCard({title,image,desc,viewLink,githubLink}){
    return(
        <div className="bg-[#0B1224]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] w-full md:w-[300px] ml-3 mr-3">
                
            <h3 className="text-lg font-semibold mb-2 text-center">
                {title}
            </h3>

            <img className="w-full h-auto p-1 rounded-3xl" src={image} alt="" />

            <p className="text-gray-400 mt-3 text-sm">
                {desc}
            </p>

            <div className="flex gap-4 mt-5">
                <a
                href={viewLink}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                View →
                </a>

                <a
                href={githubLink}
                className="text-sm text-gray-400 hover:text-white transition"
                >
                GitHub →
                </a>
            </div>

        </div>

    )
}

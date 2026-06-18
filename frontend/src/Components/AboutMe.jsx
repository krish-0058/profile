import { useEffect,useState } from "react";
import Navbar from "./Navbar";
import '../assets/styles.css'


export default function AboutMe() {

  const [education,setEducation] = useState([])
  const [experience,setExperience] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education`,{
      method:"GET"
    })

    const result = await response.json()
  
    setEducation(result.data)
    setLoading(false);
    }

    fetchData()
  },[])









  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experience`,{
      method:"GET"
    })

    const result = await response.json()
    
    setExperience(result.data)
    setLoading(false);
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
    <Navbar activePage={"aboutMe"}/>
    <div className=" px-6 md:px-20 py-16">

    
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* EDUCATION */}
        <div>

          <h2 className="text-[30px] font-bold text-blue-400 mb-10 slide-left">
            EDUCATION
          </h2>

          <div className="relative border-l border-blue-500/40 ml-4 fade-in">

            {education.map((item)=>(
              <TimelineCard
              year={item.duration}
              title={item.title}
              desc={item.description}
            />
            ))}
          
          </div>
        </div>





        {/* EXPERIENCE */}
        <div>

          <h2 className="text-[30px] font-bold text-blue-400 mb-10 slide-left">
            EXPERIENCE
          </h2>

          <div className="relative border-l border-blue-500/40 ml-4 fade-in">
            
            {experience.map((item)=>(
            <TimelineCard
              year={item.duration}
              title={item.title}
              desc={item.description}
            />
            ))}

          </div>
        </div>

      </div>
    </div>
    </div>
  );
}








/* Timeline Card */
function TimelineCard({ year, title, desc }) {
  return (
    <div className="relative mb-6 pl-7">

      {/* Dot */}
      <span className="absolute -left-[9px] top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-[#050B1A]"></span>

      {/* Card */}
      <div className="bg-[#0B1224] border border-blue-500/20 rounded-xl p-4 hover:-translate-y-1 transition duration-300">

        <p className="text-blue-400 text-xs font-semibold mb-1">
          {year}
        </p>

        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {desc}
        </p>

      </div>
    </div>
  );
}
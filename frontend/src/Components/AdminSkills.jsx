import AdminPanel from "./AdminPanel"
import { inputStyle } from "../assets/styles";
import { useState } from "react";

function AdminSkills() {


  const [skills,setSkillstData] = useState({
    skillTitle : "",
    skillDesp : "",
    projectsLink : "",
    githubLink : "",
  })


  const [softSkills,setSoftSkills] = useState({
    skillTitle : "",
    skillValue : "",
  })


  const [workEthics,setWorkEthics] = useState({
    ethicsTitle : "",
    ethicsValue : "",
  })




  const handleSKillsChange = (e) =>{
    const data = {...skills,[e.target.name]:e.target.value}
    setSkillstData(data)
  }

  const handleSoftChange = (e) =>{
    const data = {...softSkills,[e.target.name]:e.target.value}
    setSoftSkills(data)
  }

  const handleWorkChange = (e) =>{
    const data = {...workEthics,[e.target.name]:e.target.value}
    setWorkEthics(data)
  }





  const handleSkillsSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skills)
    });
    if(response.status===200){
      alert("Data submitted successfully")
    }
    else{
      alert("Error while saving data.")
    }
  }


  const handleSoftSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/soft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(softSkills)
    });
    if(response.status===200){
      alert("Data submitted successfully")
    }
    else{
      alert("Error while saving data.")
    }
  }


  const handleWorkSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/work`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workEthics)
    });
    if(response.status===200){
      alert("Data submitted successfully")
    }
    else{
      alert("Error while saving data.")
    }
  }


  

  return (
    <AdminPanel>
      <div className="flex flex-col gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-center">Skills Section</h1>
        </div>

        <form onSubmit={handleSkillsSubmit}>
        <div className="relative flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4">
          <div className="flex flex-col md:flex-nowrap w-[100%] sm:w-[60%] gap-2 mb-14 md:mb-0">
            <input type="text" placeholder="Skill Title" style={inputStyle} name="skillTitle" value={skills.skillTitle} onChange={handleSKillsChange} required/>
            <input type="text" placeholder="Skill Description" style={inputStyle} name="skillDesp" value={skills.skillDesp} onChange={handleSKillsChange} required/>
            <input type="text" placeholder="Project Link" style={inputStyle} name="projectsLink" value={skills.projectsLink} onChange={handleSKillsChange} required/>
            <input type="text" placeholder="Github Link"  style={inputStyle} name="githubLink" value={skills.githubLink} onChange={handleSKillsChange} required/>
          </div>

          <button className="absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400 bottom-4 right-2" type="submit">+ Add</button>

          </div>
        </form>

         
          <div className="flex flex-row flex-wrap md:flex-nowrap justify-between gap-5">
             <form onSubmit={handleSoftSubmit}>
            <div className="relative flex flex-row flex-wrap md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4 gap-2">
              <input type="text" placeholder="New Soft Skills" style={inputStyle} name="skillTitle" value={softSkills.skillTitle} onChange={handleSoftChange} required/>
              <input type="text" placeholder="Percentage %" style={inputStyle} className="mb-14 md:mb-0" name="skillValue" value={softSkills.skillValue} onChange={handleSoftChange} required/>

            <button className="md:static absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400  bottom-4 right-2" type="submit">+ Add</button>
          </div>
          </form>
          
          

              
          <form onSubmit={handleWorkSubmit}>
          <div className="relative flex flex-row flex-wrap md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4 gap-2">
            <input type="text" placeholder="New Work Ethics" style={inputStyle} name="ethicsTitle" value={workEthics.ethicsTitle} onChange={handleWorkChange} required/>
            <input type="text" placeholder="Percentage %" style={inputStyle} className="mb-14 md:mb-0" name="ethicsValue" value={workEthics.ethicsValue} onChange={handleWorkChange} required/>
            <button className="md:static absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400  bottom-4 right-2" type="submit">+ Add</button>
          </div>
          </form>
          </div>
        </div>
      
                        
    </AdminPanel>
  )
}

export default AdminSkills

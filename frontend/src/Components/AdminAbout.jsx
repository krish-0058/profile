import AdminPanel from "./AdminPanel"
import { inputStyle } from "../assets/styles";
import { useState} from "react";


function AdminAbout() {

  const [education,setEducation] = useState({
    duration:"",
    title:"",
    description:""
  })

  const [experience,setExperience] = useState({
    duration:"",
    title:"",
    description:""
  })


  const handleEducationSubmit = async ()=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(education)
    });
    if(response.status===200){
      alert("Data submitted successfully")
    }
    else{
      alert("Error while saving data.")
    }
  }


  const handleExperienceSubmit = async ()=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(experience)
    });
    if(response.status===200){
      alert("Data submitted successfully")
    }
    else{
      alert("Error while saving data.")
    }
  }




  const handleEducationChange = (e) =>{
    const data = {...education,[e.target.name]:e.target.value}
    setEducation(data)
  }

  const handleExperienceChange = (e) =>{
    const data = {...experience,[e.target.name]:e.target.value}
    setExperience(data)
  }



  return (
    <AdminPanel>
              <div className="flex flex-col gap-6 flex-wrap">
                <div>
                  <h1 className="text-2xl font-semibold text-center">About Section</h1>
                </div>

                <form onSubmit={handleEducationSubmit}>
                <div className="relative flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4">
                  
                  <div className="flex flex-col md:flex-nowrap w-[100%] gap-2.5 mb-10 sm:w-[60%]">
                    <input type="text" placeholder="Education Duration" style={inputStyle} name="duration" value={education.duration} onChange={handleEducationChange} required/>
                    <input type="text" placeholder="Education Title" style={inputStyle} name="title" value={education.title} onChange={handleEducationChange} required/>
                    <input type="text" placeholder="Description" style={inputStyle} name="description" value={education.description} onChange={handleEducationChange} required/>
                    <button className="absolute bottom-2 right-2 border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400" type="submit">+ Add</button>
                  </div>       
                    
                </div>
                </form> 




                <form onSubmit={handleExperienceSubmit}>
                <div className="relative flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4">
                  
                  <div className="flex flex-col md:flex-nowrap w-[100%] gap-2.5 mb-10 sm:w-[60%]">
                    <input type="text" placeholder="Experience Duration" name="duration" style={inputStyle} value={experience.duration} onChange={handleExperienceChange} required/>
                    <input type="text" placeholder="Experience Title" name="title" style={inputStyle} value={experience.title} onChange={handleExperienceChange} required/>
                    <input type="text" placeholder="Description" style={inputStyle} name="description" value={experience.description} onChange={handleExperienceChange} required/>
                    <button className="absolute bottom-2 right-2 border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400" type="submit">+ Add</button>
                  </div>          
                  
                </div>
                </form>
        
                </div>
                
            </AdminPanel>
  )
}


export default AdminAbout
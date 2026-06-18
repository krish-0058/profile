import AdminPanel from "./AdminPanel"
import { useState } from "react";
import { inputStyle } from "../assets/styles";

function AdminProjects() {


  const [imagePreview, setImagePreview] = useState(null);
  const [image,setImageFile] = useState(null)

  const [formData,setFormData] = useState({
    projectTitle:"",
    projectDesp:"",
    projectLink:"",
    githubLink:""
  }) 
     
  


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file)
    }
  }



  const handleChange = (e) =>{
    const data = {...formData,[e.target.name]:e.target.value}
    setFormData(data)
  }








  const handleSubmit = async (e) =>{
    
      e.preventDefault()

      const data = new FormData()

      data.append("projectTitle",formData.projectTitle)
      data.append("projectDesp",formData.projectDesp)
      data.append("projectLink",formData.projectLink)
      data.append("githubLink",formData.githubLink)

      if(image) data.append("image",image)

      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`,{
          method:"POST",
          body:data
        })
        if(response.ok) alert("Project saved successfully...")
      }catch(err){
        console.log(err)
      }
    }



  

  return (
    <AdminPanel>
      <div className="flex flex-col gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-center">Projects Section</h1>
        </div>
          
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4 relative">
          
          <div className="flex flex-col md:flex-nowrap w-[100%] sm:w-[60%] gap-3">
            <input type="text" placeholder="Project Title" style={inputStyle} name="projectTitle" onChange={handleChange} required/>
            <input type="text" placeholder="Project Description" style={inputStyle} name="projectDesp" onChange={handleChange} required/>
            <input type="text" placeholder="Project Link" style={inputStyle} name="projectLink" onChange={handleChange} required/>
            <input type="text" placeholder="Github Link" style={inputStyle} className="mb-14 md:mb-0" name="githubLink" onChange={handleChange} required/>
          </div>
          

          <div>
            <label className="cursor-pointer border-2 border-black rounded-full w-80 h-80 p-3 overflow-hidden flex items-center justify-center">
                
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                required
              />

              <img
                src={imagePreview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLq07xGM9gzjOb3uepZkg-RSL4AjQagHPVw&s"}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
                required
              />
            </label>
          </div>

         <button className="absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400 bottom-4 right-2" type="submit">+ Add</button>
        </div>       
        </form>     
      </div>
      
                                    
    </AdminPanel>
  )
}

export default AdminProjects
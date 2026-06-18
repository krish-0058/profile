import AdminPanel from "./AdminPanel"
import { inputStyle } from "../assets/styles";
import { useState } from "react";
import { useEffect } from "react";



function AdminHome() {

  const [imagePreview, setImagePreview] = useState(null);
  const [image,setImageFile] =useState(null)
  const [formData,setFormData] = useState({
    greeting: "",
    naam: "",
    profession: "",
    description: "",
    image : "",
    experience: "",
    projects: "",
    clients: ""
  })

  const [link,setLink] = useState({
    facebook : "",
    instagram : "",
    phone:"",
    whatsapp : "",
    viber : "",
    mail : "",
    github : "",
    linkedin : ""
  })

  const [pdf,setPDF] = useState(null)


    





  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/home`,{
      method:"GET"
    })

    const result = await response.json()
    console.log(result.data)
    setFormData(result.data)
    }

    fetchData()
    
  },[])






   useEffect(()=>{

    const fetchData = async () =>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`,{
      method:"GET"
    })

    const result = await response.json()
    console.log(result.data)
    setLink(result.data)
    }
    fetchData()

  },[])



  






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


  const handleLinkChange = (e) =>{
    const data = {...link,[e.target.name]:e.target.value}
    setLink(data)
  }









    const handleSubmit = async (e) =>{
      console.log("Hellooo")
      e.preventDefault()

      const data = new FormData()

      data.append("greeting",formData.greeting)
      data.append("naam",formData.naam)
      data.append("profession",formData.profession)
      data.append("description",formData.description)
      
      data.append("experience",formData.experience)
      data.append("projects",formData.projects)
      data.append("clients",formData.clients)

      if(image) data.append("image",image)

      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/home`,{
          method:"POST",
          body:data
        })
       if(response.ok) alert("Data changed successfully...")
      }catch(err){
        console.log(err)
      } 
    }






    const handleLinkSubmit = async (e) =>{
      console.log("Hellooo")
      e.preventDefault()

      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(link)
        })
        if(response.ok) alert("Data changed successfully...")
      }catch(err){
        console.log(err)
      } 
    }




  


    const handleCVSubmit = async(e)=>{
      e.preventDefault()

      const data = new FormData()

      data.append("pdf",pdf)

      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pdf`,{
          method:"POST",
          body:data
        })
       if(response.ok) alert("PDF changed successfully...")
      }catch(err){
        console.log(err)
      } 
    }













  return (
    <AdminPanel>
      <div className="flex flex-col gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-center">Home Section</h1>
        </div>

        <div className="relative flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4">
          <div className="flex flex-col md:flex-nowrap w-[100%] sm:w-[60%] gap-2">
            <input type="text" placeholder="Hi / Hello" style={inputStyle} value={formData.greeting} name="greeting" onChange={handleChange}/>
            <input type="text" placeholder="Your Name" style={inputStyle} value={formData.naam} name="naam" onChange={handleChange}/>
            <input type="text" placeholder="Profession" style={inputStyle} value={formData.profession} name="profession" onChange={handleChange}/>
            <textarea placeholder="Description" style={inputStyle} className="md:mb-0 mb-14" value={formData.description} name="description" onChange={handleChange}></textarea>
          </div>

          <div>
            <label className="cursor-pointer border-2 border-black rounded-full w-80 h-80 p-3 overflow-hidden flex items-center justify-center">
                
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <img
                src={imagePreview || formData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLq07xGM9gzjOb3uepZkg-RSL4AjQagHPVw&s"}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </label>
          </div>

          <button className="absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400 bottom-4 right-2" onClick={handleSubmit}>+ Add</button>   

        </div>

        <div className="relative flex flex-row flex-wrap md:flex-nowrap justify-around border border-black-300 rounded-xl p-4 gap-2">
          <input type="text" placeholder="Experience" style={inputStyle} value={formData.experience} name="experience" onChange={handleChange}/>
          <input type="text" placeholder="Projects" style={inputStyle} value={formData.projects} name="projects" onChange={handleChange}/>
          <input type="text" placeholder="Happy Clients" style={inputStyle} value={formData.clients} name="clients" onChange={handleChange} className="mb-14 md:mb-0"/>
          <button className="absolute border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400 bottom-4 right-2" onClick={handleSubmit}>+ Add</button> 
        </div>


        <div className="border rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <input type="text" placeholder="facebook link" style={inputStyle} name="facebook" value={link.facebook} onChange={handleLinkChange}/>

    <input type="text" placeholder="instagram link" style={inputStyle} name="instagram" value={link.instagram} onChange={handleLinkChange}/>

    <input type="text" placeholder="phone number" style={inputStyle} name="phone" value={link.phone} onChange={handleLinkChange}/>

    <input type="text" placeholder="whatsapp link" style={inputStyle} name="whatsapp" value={link.whatsapp} onChange={handleLinkChange}/>

    <input type="text" placeholder="viber link" style={inputStyle} name="viber" value={link.viber} onChange={handleLinkChange}/>

    <input type="text" placeholder="email" style={inputStyle} name="email" value={link.email} onChange={handleLinkChange}/>

    <input type="text" placeholder="linkedin link" style={inputStyle} name="linkedin" value={link.linkedin} onChange={handleLinkChange}/>

    <input type="text" placeholder="github link" style={inputStyle} name="github" value={link.github} onChange={handleLinkChange}/>

  </div>

          <div className="flex justify-end mt-6">
            <button
              className="border px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition bg-blue-400"
              onClick={handleLinkSubmit}
            >
              + Add
            </button>
          </div>
        </div>

        <div className="border rounded-xl p-6">
        <form onSubmit={handleCVSubmit}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">

            {/* 📦 Upload Box */}
            <div className="flex flex-col items-center justify-center gap-4 p-6 border border-gray-300 rounded-2xl shadow-md bg-white max-w-md w-full">

              <label className="w-full cursor-pointer">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl p-6 hover:bg-blue-50 transition">
                  <p className="text-gray-600 font-medium">
                    Click to upload your CV (PDF)
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Only .pdf files allowed
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setPDF(e.target.files[0])}
                  />
                </div>
              </label>

              {/* File preview */}
              {pdf && (
                <p className="text-sm text-green-600 font-medium">
                  Selected: {pdf.name}
                </p>
              )}
            </div>

            {/* 🚀 Button Box */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
              >
                Upload CV
              </button>
            </div>

          </div>
        </form>
      </div>
      
      </div>
    </AdminPanel>
  )
}



export default AdminHome
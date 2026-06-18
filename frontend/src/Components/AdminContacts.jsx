import AdminPanel from "./AdminPanel"
import { useState,useEffect } from "react"

function AdminContacts() {

  const [messages,setMessage] = useState([])

  useEffect(()=>{
    
    const fetchData = async () =>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`,{
      method:"GET"
    })
    
    const result = await response.json()
  
    setMessage(result.data)
  }
    
  fetchData()
        
  },[])
  


  return (
    <AdminPanel>
      <div className="flex flex-col gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-center">Contact Section</h1>
        </div>

        <div className="flex flex-row flex-wrap justify-left gap-3 ">
        {messages.map((message)=>(
          
            <div className="p-6 border rounded-xl shadow-md max-w-xl hover:scale-103 cursor-pointer transform transition duration-300">
              <h1 className="text-2xl font-bold mb-2">{message.clientName}</h1>
              <h2 className="text-lg text-gray-600 mb-4">{message.clientEmail}</h2>
              <p className="text-gray-700 leading-relaxed">
                {message.clientMessage}
              </p>
            </div>
          
        ))}
        </div>

        
      </div>
    </AdminPanel>
  )
}

export default AdminContacts

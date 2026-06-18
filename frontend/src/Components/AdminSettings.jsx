import AdminPanel from "./AdminPanel"
import { inputStyle } from "../assets/styles";
import { useState} from "react";
import { useNavigate } from "react-router-dom";


function AdminAbout() {

  
  const [oldPassword,setOldPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const navigate = useNavigate()


 const handleSubmit = async (e) => {
  e.preventDefault()
  try{
    if(newPassword!=confirmPassword){
    alert("Password must match")
    return
  }

  if(!oldPassword){
    alert("Please enter old password")
    return
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/settings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    })
  });

    const data = await response.json();
    if (response.status === 200) {
      alert(data.message);
      localStorage.removeItem("token");
      navigate("/auth")
    }
    if(response.status === 400){
      alert(data.message)
    }

  }catch(err){
    console.log(err)
    alert("Unexpected error occurred");
  }

};




  return (
    <AdminPanel>
              <div className="flex flex-col gap-6 flex-wrap">
                <div>
                  <h1 className="text-2xl font-semibold text-center">Settings Section</h1>
                </div>

                <form onSubmit={handleSubmit}>
                <div className="relative flex flex-row flex-wrap-reverse md:flex-nowrap justify-around items-center border border-black-300 rounded-xl p-4">
                  <div className="flex flex-col md:flex-nowrap w-[100%] gap-2.5 mb-10 sm:w-[60%]">
                    <input type="password" placeholder="Enter Old Password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} style={inputStyle} required/>
                    <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} style={inputStyle} required/>
                    <input type="password" placeholder="Conform New Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={inputStyle} required/>
                    <button className="absolute bottom-2 right-2 border border-black-300 pl-3 pr-3 py-2 rounded-xl cursor-pointer hover:scale-110 transform transition duration-300 bg-blue-400" type="submit">Change Password</button>
                  </div>          
                </div>
                </form>
              </div>
                
            </AdminPanel>
  )
}

export default AdminAbout
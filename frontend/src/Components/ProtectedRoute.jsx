import { useEffect } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"



function ProtectedRoute({children}) {

    const [loading,setloading] = useState(true)
    const [isValid,setValidity] = useState(false)

    

    useEffect(()=>{
        const checkToken = async()=>{
            const token = localStorage.getItem("token")

            if(!token){
                setValidity(false)
                setloading(false)
                return
            }


             const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-token`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });

            if(res.ok){
                setValidity(true)
            }
            else{
                localStorage.removeItem("token");
                setValidity(false);
            }
            setloading(false)
        }

        checkToken()
    },[])


    if (loading) {
    return (
      <div className="bg-[#050B1A] min-h-screen font-sans flex items-center justify-center">
        <div className="loader"></div>
      </div>
    )}

    if(!isValid){
       return <Navigate to={"/home"}/>
    }

    return (
        children
    )
}



export default ProtectedRoute
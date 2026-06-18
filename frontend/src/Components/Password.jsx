import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [password, setOldPassword] = useState("");
  const navigate = useNavigate();



  useEffect(()=>{
    localStorage.removeItem("token");
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/auth/home")
        return;
      }
      if(response.status === 400){
        alert(data.message);
        return;
      }


    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B1A] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0B1224] p-8 rounded-xl shadow-lg w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter Password
        </h2>

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#111A33] outline-none"
        />

    
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
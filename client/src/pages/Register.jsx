import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register(){

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleRegister = async () => {
    await API.post("/auth/register",{
      name,
      email,
      password,
    });

    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">

      <div className="bg-slate-800 p-6 rounded w-80">
        <h2 className="text-white mb-4">Register</h2>

        <input placeholder="Name"
          className="w-full p-2 mb-2"
          onChange={(e)=>setName(e.target.value)}
        />

        <input placeholder="Email"
          className="w-full p-2 mb-2"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input type="password"
          placeholder="Password"
          className="w-full p-2 mb-2"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 w-full py-2 text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
}
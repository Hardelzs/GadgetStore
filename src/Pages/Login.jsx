import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import WaterDrop from '../components/WaterDrop';
import WaterDrop from '../Components/WaterDrop';
import { DivOrigami } from '../Components/DivOrigami';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function Login() {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const storedPassword = localStorage.getItem("password") || "dudevice01";


  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId === "Dominion" && password === storedPassword) {
      navigate("/dashboard");
    } else {
      alert("Error: Invalid Student ID or Password");
    }
  }

  const handleclick = () => {
    setShow(!show)
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* WaterDrop background */}
      <div className="absolute left-435 bottom-0 sm:right-5">
        <DivOrigami />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <WaterDrop />
      </div>
      {/* Login form */}
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-md z-10 relative md:ml-0 ml-27">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm font-medium">ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded text-xs sm:text-base"
              placeholder="Enter your ID"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium">Password</label>
            <div className="flex items-center justify-between">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" mt-1 p-2 border w-[39vh] border-gray-300 rounded text-xs sm:text-base"
                placeholder="********"
              />
              <p
                onClick={handleclick}
                className='ml-[-5vh] text-1xl cursor-pointer hover:text-[red] duration-300 '>{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D2D31] text-white py-2 px-4 rounded hover:bg-[#474747] transition cursor-pointer text-xs sm:text-base"
          >
            Login
          </button>
          <div className="mt-3 sm:mt-4 text-center">
            <a href="/password" className="text-xs sm:text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
      {/* Handwriting text bottom right */}
      <div
        className="fixed bottom-4 text  right-4 z-50 text-black font-bold text-lg"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        <i>Hardelz • LightArts • NACOS DU</i>
      </div>
    </div>
  );
}

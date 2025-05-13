import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (

    <aside className="absolute w-48 rounded-md h-[977px] bg-[#2D2D31] text-white ml-2 top-2 left-0 p-4">
      <h2 className="text-1xl font-bold mb-10 flex items-center justify-center"><MdOutlineDashboardCustomize />GadgetReg</h2>

      <nav className="flex flex-col text gap-4">
        <Link to="/dashboard" className="bg-blue-500 p-2 rounded flex items-center gap-2">
          <FaUser /> Dashboard
        </Link>
        <Link to="/Registerdevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaLaptop /> Register Device
        </Link>
        <Link to="/Mydevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaThList /> My Devices
        </Link>
        <Link to="/" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <PiSignOutBold /> Sign out
        </Link>

        <Link to="/" className="bg-blue-500 mt-[640px] p-2  rounded flex items-center gap-2">
          <PiSignOutBold /> Sign out
        </Link>
      </nav>


      <nav className="flex-col text gap-4 hidden">
        <Link to="/dashboard" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaUser /> Dashboard
        </Link>
        <Link to="/Registerdevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaLaptop /> Register Device
        </Link>
        <Link to="/Mydevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaThList /> My Devices
        </Link>
      </nav>
    </aside>

    
  );
}

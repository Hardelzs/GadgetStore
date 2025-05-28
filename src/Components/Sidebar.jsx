import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:block text2 fixed top-2 left-0 h-[977px] p-4 bg-[#2D2D31] text-white rounded-md ml-2 w-16 md:w-48 transition-all duration-300">
      {/* Header */}
      <div className="grid place-content-center">
        <h2 className="text-xl font-bold mb-10 flex items-center justify-center md:justify-start gap-2">
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  width="25.000000pt" height="25.000000pt" viewBox="0 0 300.000000 300.000000"  preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> <path d="M445 2957 c-122 -32 -205 -92 -247 -178 l-26 -54 20 -1150 c11 -639 24 -1174 30 -1204 17 -92 115 -177 253 -222 66 -21 92 -22 515 -29 245 -4 695 -9 1000 -11 510 -3 560 -2 620 15 121 33 201 89 242 170 21 41 21 46 14 496 -3 250 -9 570 -12 710 -3 140 -9 467 -14 726 -10 541 -7 521 -100 607 -68 64 -156 100 -276 116 -46 6 -473 12 -1024 15 -760 5 -955 3 -995 -7z m1080 -12 c808 -5 956 -10 1015 -32 8 -4 21 -5 29 -4 8 1 10 -2 5 -10 -5 -8 -2 -11 8 -7 42 17 164 -74 203 -151 22 -44 23 -58 29 -366 3 -176 8 -428 11 -560 27 -1274 28 -1455 11 -1500 -30 -77 -143 -160 -231 -170 -16 -1 -37 -5 -45 -8 -40 -14 -140 -15 -1010 -6 -1019 10 -1023 11 -1144 69 -71 34 -119 76 -145 128 -16 32 -20 70 -25 262 -12 423 -38 2002 -34 2084 3 72 7 86 35 127 60 86 162 135 313 148 41 4 80 6 85 5 6 -1 406 -5 890 -9z"/> <path d="M505 2844 c-59 -19 -109 -54 -137 -98 -19 -30 -19 -43 -14 -321 4 -159 13 -681 21 -1160 10 -567 20 -880 27 -898 13 -33 70 -85 103 -93 14 -3 25 -10 25 -14 0 -5 124 -9 277 -10 152 0 280 -3 284 -6 4 -2 326 -6 716 -8 768 -4 769 -3 833 50 65 55 64 44 56 509 -21 1285 -36 1873 -46 1900 -14 37 -67 94 -100 107 -86 35 -115 37 -908 42 -433 4 -854 8 -937 11 -117 3 -161 1 -200 -11z m1410 -23 c378 -6 562 -12 588 -20 53 -17 115 -75 127 -120 5 -20 14 -346 20 -726 6 -379 15 -890 20 -1134 10 -491 11 -477 -52 -524 -67 -50 -54 -49 -916 -42 -444 4 -886 10 -982 14 -167 7 -178 8 -227 35 -81 44 -81 43 -87 501 -10 612 -25 1449 -31 1683 -6 228 -4 243 47 288 35 33 63 44 125 52 63 8 539 5 1368 -7z"/> <path d="M1079 2742 c-27 -24 -29 -30 -20 -54 22 -59 28 -60 419 -66 320 -4 361 -3 390 12 32 17 49 53 38 81 -3 9 -25 25 -48 35 -40 18 -69 20 -395 20 l-353 0 -31 -28z m766 -9 c26 -8 30 -14 30 -44 0 -26 -4 -34 -17 -33 -10 1 -18 -2 -18 -7 0 -12 -642 -11 -695 1 -65 15 -84 62 -35 88 20 10 97 12 365 9 187 -2 354 -9 370 -14z"/> <path d="M2171 2169 c-19 -11 -80 -62 -135 -112 -56 -51 -135 -122 -176 -158 -41 -36 -173 -152 -293 -258 l-218 -193 -22 19 c-90 80 -281 245 -321 278 -42 34 -56 40 -110 43 -56 4 -65 1 -94 -23 -60 -50 -51 -65 154 -241 50 -44 137 -118 192 -167 108 -94 149 -117 212 -117 78 0 62 -13 545 415 87 77 203 180 259 228 162 142 216 198 216 221 -1 71 -132 112 -209 65z m174 -35 c8 -10 14 -23 15 -29 0 -18 -42 -60 -170 -171 -69 -59 -152 -133 -185 -163 -58 -53 -78 -71 -170 -150 -40 -34 -123 -108 -265 -236 -112 -101 -154 -125 -216 -125 -34 0 -58 5 -68 15 -8 9 -17 14 -19 13 -6 -4 -74 54 -371 316 -78 69 -106 97 -106 107 0 4 8 17 19 30 15 18 29 23 62 23 24 0 54 -2 66 -5 27 -6 115 -76 268 -212 60 -55 120 -104 132 -109 19 -10 33 0 126 83 57 52 150 135 208 185 57 51 192 170 298 265 107 95 210 178 228 184 45 16 129 4 148 -21z"/> </g> </svg> 
          <span className="hidden md:inline">DuReg</span>
        </h2>
        <hr className="text-[#4b4a4a] -mt-4" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 mt-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaUser className="text-lg" />
          <span className="hidden md:inline">Dashboard</span>
        </NavLink>
        <NavLink
          to="/Registerdevice"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaLaptop className="text-lg" />
          <span className="hidden md:inline">Register Device</span>
        </NavLink>
        <NavLink
          to="/Mydevice"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaThList className="text-lg" />
          <span className="hidden md:inline">Devices</span>
        </NavLink>


        <NavLink
          to="/"
          className={
            "bg-blue-500 hover:bg-[#ff6464] mt-[690px] p-2 rounded flex items-center gap-2"
          }
        >
          <PiSignOutBold className="text-lg" />
          <span className="hidden md:inline">Sign out</span>
        </NavLink>
      </nav>
    </aside>
  );
}

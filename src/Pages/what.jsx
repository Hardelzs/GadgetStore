import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState, useEffect, useRef } from "react";
import deviceData from "../Data/deviceData.json";
import { saveDevice } from "../utils/deviceService.js";
import { FaPlus } from "react-icons/fa";

export default function RegisterDevice() {
  const [student, setStudent] = useState({
    hallresidence: "",
    semester: "",
    gender: "",
    matric: "",
    date: new Date().toISOString(),
  });

  const [deviceCount, setDeviceCount] = useState(1); // number of devices
  const [devices, setDevices] = useState([
    { type: "", brand: "", name: "", serial: "", mac: "", image: "" },
  ]);

  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRefs = useRef([]);

  // Handle student details change
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle device details change
  const handleDeviceChange = (index, e) => {
    const { name, value, files } = e.target;
    const updated = [...devices];
    if (name === "image" && files?.[0]) {
      updated[index].image = files[0];
    } else {
      updated[index][name] = value;
    }
    setDevices(updated);
  };

  // Handle device count (1–10)
  const handleDeviceCount = (e) => {
    const count = Number(e.target.value);
    setDeviceCount(count);
    setDevices((prev) => {
      const newDevices = [...prev];
      while (newDevices.length < count) {
        newDevices.push({
          type: "",
          brand: "",
          name: "",
          serial: "",
          mac: "",
          image: "",
        });
      }
      return newDevices.slice(0, count);
    });
  };

  // Submit all devices
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < devices.length; i++) {
        const d = devices[i];
        let imageBase64 = "";

        if (d.image instanceof File) {
          imageBase64 = await toBase64(d.image);
        } else {
          const defaults = {
            Laptop: "/laptop.webp",
            Phone: "/phone.webp",
            Tab: "/tab.webp",
            Airpod: "/airpod.webp",
            Mifi: "/mifi.png",
            Smartwatch: "/smartwatch.png",
            Others: "/others.webp",
          };
          imageBase64 = defaults[d.type] || defaults["Others"];
        }

        const deviceWithMeta = {
          ...student,
          ...d,
          image: imageBase64,
        };

        await saveDevice(deviceWithMeta);
      }

      setSuccessMessage(`✅ ${devices.length} device(s) registered successfully!`);
      setTimeout(() => setSuccessMessage(""), 4000);

      // Reset
      setStudent({ hallresidence: "", semester: "", gender: "", matric: "", date: new Date().toISOString() });
      setDevices([{ type: "", brand: "", name: "", serial: "", mac: "", image: "" }]);
      setDeviceCount(1);

    } catch (err) {
      console.error("Error saving devices:", err);
      setSuccessMessage("❌ Failed to save devices.");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52">
        <Topbar pageName="Register Device" middlename="Multiple Devices" />
        <main className="mt-20 p-6">
          {successMessage && (
            <div className="mb-4 text-center p-3 rounded bg-green-100 text-green-700 border border-green-300">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1 - Student Details */}
            <section className="p-4 border rounded shadow bg-white">
              <h2 className="text-lg font-bold mb-4">Student Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="matric" placeholder="Matric Number" value={student.matric} onChange={handleStudentChange} className="border p-2 rounded" required />
                <select name="semester" value={student.semester} onChange={handleStudentChange} className="border p-2 rounded" required>
                  <option value="">-- Semester --</option>
                  <option>Alpha Semester</option>
                  <option>Omega Semester</option>
                </select>
                <input name="hallresidence" placeholder="Hall of Residence" value={student.hallresidence} onChange={handleStudentChange} className="border p-2 rounded" />
                <select name="gender" value={student.gender} onChange={handleStudentChange} className="border p-2 rounded">
                  <option value="">-- Gender --</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </section>

            {/* Section 2 - Number of Devices & Date */}
            <section className="p-4 border rounded shadow bg-white">
              <h2 className="text-lg font-bold mb-4">Devices Selection</h2>
              <div className="flex gap-4 flex-wrap">
                {[...Array(10).keys()].map((n) => (
                  <label key={n} className="flex items-center gap-1">
                    <input type="radio" name="deviceCount" value={n + 1} checked={deviceCount === n + 1} onChange={handleDeviceCount} />
                    {n + 1}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Date & Time</label>
                <input type="datetime-local" name="date" value={student.date.slice(0, 16)} onChange={handleStudentChange} className="border p-2 rounded w-full" required />
              </div>
            </section>

            {/* Section 3 - Device Details */}
            <section className="p-4 border rounded shadow bg-white">
              <h2 className="text-lg font-bold mb-4">Device Details</h2>
              {devices.map((d, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="font-semibold mb-2">Device {index + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="type" value={d.type} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" required>
                      <option value="">-- Type --</option>
                      <option>Laptop</option>
                      <option>Phone</option>
                      <option>Tab</option>
                      <option>Airpod</option>
                      <option>Mifi</option>
                      <option>Smartwatch</option>
                      <option>Others</option>
                    </select>
                    <input name="brand" placeholder="Brand" value={d.brand} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" required />
                    <input name="name" placeholder="Model / Name" value={d.name} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" required />
                    <input name="serial" placeholder="Serial Number" value={d.serial} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" required />
                    <input name="mac" placeholder="MAC / IMEI" value={d.mac} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" />
                    <input type="file" name="image" accept="image/*" ref={(el) => (fileInputRefs.current[index] = el)} onChange={(e) => handleDeviceChange(index, e)} className="border p-2 rounded" />
                  </div>
                </div>
              ))}
            </section>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Submit Devices
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

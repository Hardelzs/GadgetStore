// src/pages/MyDevices.jsx
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Mydevice() {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedDeviceId, setDeletedDeviceId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");

  const API_URL = "http://localhost:5000/devices";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Error loading devices:", err));
  }, []);

  const updateServerDevices = (updatedDevices) => {
    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDevices),
    })
      .then((res) => res.json())
      .then(() => setDevices(updatedDevices))
      .catch((err) => console.error("Error saving devices:", err));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this device?");
    if (confirm) {
      setDeletedDeviceId(id);
      setTimeout(() => {
        const updated = devices.filter((d) => d.id !== id);
        updateServerDevices(updated);
        setDeletedDeviceId(null);
      }, 300);
    }
  };

  function handleEdit(device) {
    setEditingDevice(device);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const updatedDevices = devices.map((item) =>
      item.id === editingDevice.id ? editingDevice : item
    );
    updateServerDevices(updatedDevices);
    setEditingDevice(null);
  }

  const filteredDevices = devices.filter((device) => {
    const matchesMatric = device.matric
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSemester =
      !selectedSemester || device.semester === selectedSemester;
    return matchesMatric && matchesSemester;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52">
        <Topbar />
        <main className="mt-40 p-6">
          <div className="flex items-center justify-center mb-6 gap-4 md:mt-0 mt-10">
            <input
              type="text"
              placeholder="Matric number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded w-96 px-4 py-2 focus:outline-0"
            />
            <button
              className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setSearchTerm("")}
            >
              Search
            </button>

            <select
              name="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-[300px] mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">All Semesters</option>
              <option value="Alpha Semester">Alpha Semester</option>
              <option value="Omega Semester">Omega Semester</option>
            </select>
          </div>

          <h2 className="text-2xl font-bold mb-6">Registered Devices</h2>

          {filteredDevices.length === 0 ? (
            <p className="text-gray-500">No devices match the search criteria.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className={`border border-gray-200 rounded shadow p-4 flex flex-col transition-all duration-300 ease-in-out transform
                    ${
                      deletedDeviceId === device.id
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }
                  `}
                >
                  <img
                    src={device.image}
                    className="h-32 object-contain mb-3"
                  />
                  <div className="mb-2"><strong>Type:</strong> {device.type}</div>
                  <div className="mb-2"><strong>Brand:</strong> {device.brand}</div>
                  <div className="mb-2"><strong>Name:</strong> {device.name}</div>
                  <div className="mb-2"><strong>Serial:</strong> {device.serial || "N/A"}</div>
                  <div className="mb-4 text-sm text-gray-600"><strong>MAC:</strong> {device.mac || "N/A"}</div>
                  <div className="mb-4 text-sm text-gray-600"><strong>Matric:</strong> {device.matric}</div>
                  <div className="mb-4 text-sm text-gray-600"><strong>Date:</strong> {device.date || "N/A"}</div>

                  <div className="mt-auto flex justify-between">
                    <button
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(device)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editingDevice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <form
                onSubmit={handleUpdate}
                className="flex flex-col w-96 bg-white p-8 rounded shadow-lg relative"
              >
                {/* ... same edit form inputs ... */}
                {/* Fields omitted here for brevity, but you keep them unchanged */}
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
